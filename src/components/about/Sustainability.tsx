"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, GraduationCap, Recycle } from 'lucide-react';

interface SustainabilityProps {
  className?: string;
}

export const Sustainability: React.FC<SustainabilityProps> = ({ className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Environmental Sustainability */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">إنتاج صديق للبيئة</h3>
            <p className="text-gray-700 leading-relaxed text-center">
              نلتزم بتبني ممارسات صديقة للبيئة في جميع عملياتنا، من خلال تقليل استهلاك الطاقة، وإعادة تدوير المخلفات، واستخدام مواد صديقة للبيئة في التغليف والتصنيع.
            </p>
          </motion.div>
          
          {/* Community Training */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">برامج تدريب مجتمعية</h3>
            <p className="text-gray-700 leading-relaxed text-center">
              نقدم برامج تدريبية مجانية للشباب في مجالات التصميم والقص الرقمي، بهدف تمكينهم من اكتساب مهارات تقنية جديدة وتعزيز فرصهم في سوق العمل، مع التركيز على المناطق النائية والمجتمعات المهمشة.
            </p>
          </motion.div>
          
          {/* Product Lifecycle */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="bg-purple-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Recycle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">استدامة دورة حياة المنتج</h3>
            <p className="text-gray-700 leading-relaxed text-center">
              نصمم منتجاتنا لتكون قابلة للترقية والإصلاح بسهولة، مما يطيل من عمرها الافتراضي ويقلل من النفايات الإلكترونية. كما نوفر برنامج لاستعادة وإعادة تدوير الأجهزة القديمة بطريقة آمنة بيئيًا.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sustainability; 