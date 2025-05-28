"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Scissors, ThumbsUp, Building, LucideIcon } from 'lucide-react';
import { KPI, kpis } from '@/data/kpis';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

// مكون العداد الفردي
const Counter: React.FC<CounterProps> = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = end / (duration * 60); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [end, duration, isInView]);
  
  return (
    <span ref={counterRef} className="inline-block">
      {count}{suffix}
    </span>
  );
};

interface KPICounterProps {
  className?: string;
}

export const KPICounter: React.FC<KPICounterProps> = ({ className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // خريطة الأيقونات للاستخدام في عدادات مؤشرات الأداء الرئيسية
  const iconMap: { [key: string]: React.ReactNode } = {
    Users: <Users className="h-6 w-6" />,
    Scissors: <Scissors className="h-6 w-6" />,
    ThumbsUp: <ThumbsUp className="h-6 w-6" />,
    Building: <Building className="h-6 w-6" />
  };

  const getIcon = (iconName?: string) => {
    if (!iconName || !iconMap[iconName]) {
      return <Building className="h-6 w-6" />;
    }
    return iconMap[iconName];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div ref={ref} className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {kpis.map((kpi) => (
            <motion.div 
              key={kpi.id} 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="text-primary">
                    {getIcon(kpi.icon)}
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">
                  <Counter end={kpi.value} suffix={kpi.suffix} />
                </h3>
                <p className="text-gray-600">{kpi.labelAr}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default KPICounter; 