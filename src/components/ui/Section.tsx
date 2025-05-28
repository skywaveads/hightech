"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  container?: boolean;
  background?: 'white' | 'light' | 'dark' | 'gradient' | 'none';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

export const Section: React.FC<SectionProps> = ({
  id,
  className,
  children,
  container = true,
  background = 'white',
  spacing = 'medium',
}) => {
  const bgClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-900 to-blue-700 text-white',
    none: '',
  };

  const spacingClasses = {
    none: '',
    small: 'py-8 md:py-10',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={cn(
        bgClasses[background],
        spacingClasses[spacing],
        className
      )}
    >
      {container ? (
        <div className="container mx-auto px-4">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section; 