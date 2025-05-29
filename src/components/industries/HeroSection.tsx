"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative h-[500px] overflow-hidden bg-gradient-to-r from-primary to-primary/80"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <path d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm-3 9h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 4h2v-2H11v2zm4 0h2v-2h-2v2zm8 0h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2v-2h-2v2zm-8 8h2v-2H11v2zm8 0h2v-2h-2v2zm4 0h2v-2h-2v2z" fill="currentColor" />
        </svg>
      </div>
      
      {/* Image Overlay (semi-transparent) */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/industries/banner.png"
          alt="أجهزة كتر بلوتر لمختلف الصناعات"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          الصناعات التي ندعمها
        </motion.h1>
        
        <motion.p 
          className="text-xl max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          نقدم حلول القص الدقيقة المصممة خصيصًا لتلبية متطلبات صناعتك مع ضمان أعلى جودة وكفاءة إنتاجية
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection; 