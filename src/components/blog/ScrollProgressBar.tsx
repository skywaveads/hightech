"use client";

import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateProgress);
    
    // Initial calculation
    updateProgress();
    
    // Cleanup
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-gray-100">
      <div 
        className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all ease-out duration-200 shadow-sm"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute right-0 top-0 h-full w-5 bg-white opacity-30 animate-pulse rounded-full shadow-sm transform translate-x-2"></div>
      </div>
    </div>
  );
} 