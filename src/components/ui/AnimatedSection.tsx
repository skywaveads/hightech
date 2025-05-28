"use client";

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn' | 'slideInUp' | 'slideInDown';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all ease-out';
    const durationClass = `duration-${Math.round(duration * 1000)}`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp':
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`;
        case 'fadeInLeft':
          return `${baseClass} ${durationClass} opacity-0 -translate-x-8`;
        case 'fadeInRight':
          return `${baseClass} ${durationClass} opacity-0 translate-x-8`;
        case 'fadeIn':
          return `${baseClass} ${durationClass} opacity-0`;
        case 'scaleIn':
          return `${baseClass} ${durationClass} opacity-0 scale-95`;
        case 'slideInUp':
          return `${baseClass} ${durationClass} translate-y-full`;
        case 'slideInDown':
          return `${baseClass} ${durationClass} -translate-y-full`;
        default:
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`;
      }
    }

    return `${baseClass} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      id={id}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;