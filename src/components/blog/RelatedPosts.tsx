"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
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

export default function RelatedPosts({ posts, className }: RelatedPostsProps) {
  const [formattedPosts, setFormattedPosts] = useState<Array<BlogPost & { formattedDate: string }>>([]);
  
  useEffect(() => {
    if (posts && posts.length > 0) {
      const postsWithFormattedDates = posts.map(post => ({
        ...post,
        formattedDate: formatDate(post.publishedAt)
      }));
      setFormattedPosts(postsWithFormattedDates);
    }
  }, [posts]);
  
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-bold mb-5 text-gray-900 border-r-4 border-primary-500 pr-3">مقالات ذات صلة</h3>
      <ul className="space-y-4">
        {formattedPosts.map(post => (
          <li key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="flex items-start gap-3 hover:no-underline">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src={post.coverImage}
                  alt={post.titleAr}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 className="text-gray-900 font-medium line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {post.titleAr}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {post.formattedDate}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}