'use client';

import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  // استخراج أول حرف من الاسم وتحويله للإنجليزية
  const getInitial = (name: string): string => {
    if (!name) return 'U';
    
    // خريطة تحويل الأحرف العربية للإنجليزية
    const arabicToEnglish: { [key: string]: string } = {
      'أ': 'A', 'ا': 'A', 'آ': 'A', 'إ': 'A', 'ب': 'B', 'ت': 'T', 'ث': 'T',
      'ج': 'J', 'ح': 'H', 'خ': 'K', 'د': 'D', 'ذ': 'D', 'ر': 'R', 'ز': 'Z',
      'س': 'S', 'ش': 'S', 'ص': 'S', 'ض': 'D', 'ط': 'T', 'ظ': 'Z', 'ع': 'A',
      'غ': 'G', 'ف': 'F', 'ق': 'Q', 'ك': 'K', 'ل': 'L', 'م': 'M', 'ن': 'N',
      'ه': 'H', 'و': 'W', 'ي': 'Y', 'ى': 'Y', 'ة': 'H'
    };

    const firstChar = name.trim().charAt(0).toUpperCase();
    
    // إذا كان الحرف عربي، نحوله للإنجليزية
    if (arabicToEnglish[firstChar]) {
      return arabicToEnglish[firstChar];
    }
    
    // إذا كان إنجليزي، نعيده كما هو
    if (/[A-Z]/.test(firstChar)) {
      return firstChar;
    }
    
    // افتراضي
    return 'U';
  };

  // توليد لون عشوائي بناءً على الاسم
  const generateColor = (name: string): string => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500',
      'bg-violet-500', 'bg-fuchsia-500', 'bg-rose-500', 'bg-sky-500'
    ];

    // التحقق من وجود الاسم وأنه ليس فارغ
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return colors[0] || 'bg-blue-500'; // إرجاع لون افتراضي
    }

    // استخدام hash بسيط لضمان نفس اللون لنفس الاسم
    let hash = 0;
    const safeName = name.trim();
    for (let i = 0; i < safeName.length; i++) {
      hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index] || 'bg-blue-500';
  };

  // أحجام مختلفة
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const initial = getInitial(name);
  const bgColor = generateColor(name);

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${bgColor} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold 
        shadow-md
        ${className}
      `}
    >
      {initial}
    </div>
  );
};

export default Avatar;