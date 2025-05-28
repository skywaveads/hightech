"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Truck, Wrench } from 'lucide-react';
import { regions } from '@/data/regions';

interface RegionalFootprintProps {
  className?: string;
}

export const RegionalFootprint: React.FC<RegionalFootprintProps> = ({ className }) => {
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {regions.map((region) => (
            <motion.div 
              key={region.id} 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Regional header */}
              <div className="bg-primary text-white p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">{region.nameAr}</h3>
                <span className="text-3xl">{region.flag}</span>
              </div>
              
              {/* Main city */}
              <div className="flex items-center p-4 border-b border-gray-100">
                <MapPin className="h-5 w-5 text-primary ml-2" />
                <span className="text-gray-700">{region.mainCityAr}</span>
              </div>
              
              {/* Stats */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-700">
                    <Truck className="h-4 w-4 ml-2 text-primary" />
                    <span>أجهزة مثبتة</span>
                  </div>
                  <span className="font-bold">{region.stats.machines}+</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 ml-2 text-primary" />
                    <span>شركاء موزعين</span>
                  </div>
                  <span className="font-bold">{region.stats.partners}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Wrench className="h-4 w-4 ml-2 text-primary" />
                    <span>مراكز دعم</span>
                  </div>
                  <span className="font-bold">{region.stats.supportHubs}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RegionalFootprint; 