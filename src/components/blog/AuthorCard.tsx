"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Author } from '@/data/authors';
import { Linkedin } from 'lucide-react';

interface AuthorCardProps {
  author: Author;
  publishDate: string; // ISO date string
  className?: string;
}

// Array of Arabic month names
const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

// Array of Arabic numerals
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

// Convert number to Arabic numeral string
function toArabicNumeral(num: number): string {
  return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)] || digit).join('');
}

// Format date with stable output
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const day = toArabicNumeral(date.getDate());
    const month = arabicMonths[date.getMonth()];
    const year = toArabicNumeral(date.getFullYear());
    
    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}

export default function AuthorCard({ author, publishDate, className }: AuthorCardProps) {
  // Use client-side rendering for date display
  const [dateDisplay, setDateDisplay] = useState<string>('');
  
  useEffect(() => {
    setDateDisplay(formatDate(publishDate));
  }, [publishDate]);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/70">
        <Image 
          src={author.image}
          alt={author.nameAr}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-inherit">
          <Link href={`/authors/${author.id}`} className="hover:underline">
            {author.nameAr}
            </Link>
        </h2>
        <div className="text-sm opacity-90">
          <span className="ml-1">{author.titleAr}</span>
          •
          <time dateTime={publishDate} className="mr-1">
            {dateDisplay}
          </time>
        </div>
      </div>
    </div>
  );
}