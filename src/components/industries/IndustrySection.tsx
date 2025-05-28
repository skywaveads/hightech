"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';
import { Industry, FAQ } from '@/data/industries';

interface IndustrySectionProps {
  industry: Industry;
  isEven: boolean;
  faqs: FAQ[];
}

const IndustrySection: React.FC<IndustrySectionProps> = ({ industry, isEven, faqs }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <section 
      id={industry.id}
      ref={ref}
      className={`py-16 ${isEven ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Image */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={industry.image}
                alt={`${industry.titleAr} - ${industry.keywords[0]}`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {industry.titleAr}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-700 mb-6 leading-relaxed"
            >
              {industry.descriptionAr}
            </motion.p>
            
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-lg font-semibold mb-3">المزايا الرئيسية:</h3>
              <ul className="space-y-2">
                {industry.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 text-primary mr-2 mt-1">
                      <Check size={18} />
                    </span>
                    <span>{benefit.titleAr}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button asChild className="group">
                <Link href="/contact" className="flex items-center">
                  <span>طلب استشارة مجانية</span>
                  <ChevronRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* FAQs */}
        {faqs.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">الأسئلة الشائعة</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-primary mb-2">{faq.questionAr}</h4>
                  <p className="text-gray-700">{faq.answerAr}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default IndustrySection; 