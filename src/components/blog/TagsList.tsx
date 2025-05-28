"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagsListProps {
  tags: string[];
  className?: string;
}

export default function TagsList({ tags, className }: TagsListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("rtl:text-right", className)}>
      <h3 className="text-xl font-bold mb-4 text-gray-900 border-r-4 border-primary-500 pr-3 inline-block">الوسوم</h3>
      <ul className="flex flex-wrap gap-2 mt-3">
        {tags.map(tag => (
          <li key={tag}>
            <Link
              href={`/blog/tags/${encodeURIComponent(tag)}`}
              className="inline-block px-4 py-2 rounded-full bg-white text-primary-700 border border-primary-200 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-colors duration-200"
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 