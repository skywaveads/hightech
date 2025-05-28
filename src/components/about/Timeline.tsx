"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building, Award, Users, MapPin, Cog } from 'lucide-react';
import { Milestone, milestones } from '@/data/milestones';

interface TimelineProps {
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // خريطة الأيقونات للاستخدام في الخط الزمني
  const iconMap: { [key: string]: React.ReactNode } = {
    Building: <Building className="h-6 w-6" />,
    Award: <Award className="h-6 w-6" />,
    Users: <Users className="h-6 w-6" />,
    MapPin: <MapPin className="h-6 w-6" />,
    Cog: <Cog className="h-6 w-6" />
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
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={`py-12 ${className}`} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col md:flex-row relative"
        >
          {/* Line connecting timeline items (desktop) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 -ml-0.5 z-0"></div>

          {/* Timeline items */}
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year} 
              className={`w-full md:w-1/2 mb-8 md:mb-0 md:px-8 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
              variants={itemVariants}
            >
              <div className={`relative ${index % 2 === 0 ? 'md:text-left md:rtl-text-right' : 'md:text-right md:rtl-text-left'}`}>
                {/* Connector line and dot (desktop) */}
                <div className="hidden md:block absolute top-6 w-5 h-5 rounded-full bg-primary shadow-md z-10 
                  transform -translate-y-1/2 border-4 border-white
                  left-0 md:left-auto md:right-auto
                  md:left-0 md:right-auto
                  md:-ml-10 md:-mr-10
                  "></div>

                {/* Circle with icon (mobile) */}
                <div className="md:hidden mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shadow-sm">
                  <div className="text-primary">
                    {getIcon(milestone.icon)}
                  </div>
                </div>

                {/* Content box */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative z-10">
                  {/* Year label */}
                  <div className="absolute top-0 -mt-3 bg-primary text-white px-3 py-1 rounded-full font-bold text-sm">
                    {milestone.year}
                  </div>
                  
                  {/* Circle with icon (desktop) */}
                  <div className="hidden md:flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                      <div className="text-primary">
                        {getIcon(milestone.icon)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mx-3 flex-1">{milestone.titleAr}</h3>
                  </div>
                  
                  {/* Title (mobile) */}
                  <h3 className="md:hidden text-xl font-bold mb-3 text-center">{milestone.titleAr}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600">{milestone.descriptionAr}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline; 