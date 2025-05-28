import React from 'react';
import Link from 'next/link';

interface CategoriesListProps {
  categories: string[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category} className="border-b border-gray-100 pb-2 last:border-0">
          <Link
            href={`/blog/category/${encodeURIComponent(category)}`}
            className="flex items-center justify-between text-gray-700 hover:text-primary-600 transition-colors group"
          >
            <span>{category}</span>
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-primary-600 rtl:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
} 