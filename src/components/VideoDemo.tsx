"use client";

import React, { useState, useRef, useEffect } from 'react';
import Section from '@/components/ui/Section';

const VideoDemo: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
      };

      const handleError = () => {
        setHasError(true);
        setIsLoaded(false);
      };

      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      
      // تحديد timeout للتحميل
      const timeout = setTimeout(() => {
        if (!isLoaded) {
          setIsLoaded(true); // إظهار الفيديو حتى لو لم يتم تحميله بالكامل
        }
      }, 5000);

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        clearTimeout(timeout);
      };
    }
    return undefined;
  }, [isLoaded]);

  return (
    <Section id="video-demo" background="dark" container={false}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          شاهد هاي كت في العمل
        </h2>
        <p className="text-xl max-w-3xl mx-auto">
          تعرف على أداء وإمكانيات أجهزة كتر بلوتر هاي كت في مختلف التطبيقات
        </p>
      </div>
      
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
          {!isLoaded && !hasError && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>جاري تحميل الفيديو...</p>
              </div>
            </div>
          )}
          
          {hasError && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-xl font-bold mb-2">فيديو توضيحي</h3>
                <p className="text-gray-300">شاهد أجهزة كتر بلوتر هاي كت في العمل</p>
              </div>
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1087880979?h=0&autoplay=1&loop=1&muted=1&background=1"
            className={`absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl transition-opacity duration-500 ${
              isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
            }`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="فيديو توضيحي لجهاز كتر بلوتر هاي كت"
            loading="lazy"
            style={{ border: 'none' }}
          ></iframe>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0 flex flex-col items-center justify-end text-center p-6 pointer-events-none rounded-lg">
          <div className="text-white max-w-3xl mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              دقة استثنائية في القص
            </h3>
            <p className="text-lg md:text-xl">
              تقنية السيرفو المتطورة توفر دقة عالية وتشطيب احترافي بأقل نسبة خطأ
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VideoDemo; 