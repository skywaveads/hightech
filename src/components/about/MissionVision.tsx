"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

interface MissionVisionProps {
  className?: string;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const missionPoints = [
    "توفير تقنيات القص الدقيقة بأسعار تنافسية للشركات من جميع الأحجام",
    "تقديم دعم فني متميز على مدار الساعة لعملائنا في جميع أنحاء المنطقة",
    "نشر الوعي التقني وتدريب العملاء على الاستخدام الأمثل لأجهزتنا",
    "ضمان جودة المنتجات والخدمات بما يتوافق مع المعايير العالمية"
  ];

  return (
    <div ref={ref} className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Mission */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="border-r-4 border-primary h-full p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 rounded-full p-3 ml-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">مهمتنا</h3>
              </div>
              
              <ul className="space-y-4 mb-6">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 ml-3 min-w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Vision */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="border-r-4 border-primary h-full p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 rounded-full p-3 ml-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">رؤيتنا</h3>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                نتطلع إلى أن نكون الشريك الأول والمفضل لكل من يحتاج إلى حلول القص والطباعة في منطقة الشرق الأوسط وشمال أفريقيا، من خلال تقديم منتجات عالية الجودة وخدمة عملاء استثنائية وابتكارات تقنية مستمرة.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                نسعى بحلول عام 2030 إلى توسيع شبكة خدماتنا لتشمل جميع الدول العربية، مع تطوير منتجات وحلول مبتكرة تلبي احتياجات السوق المتغيرة، ودعم الاقتصاد المحلي من خلال توفير فرص عمل وبرامج تدريب متخصصة.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MissionVision; 