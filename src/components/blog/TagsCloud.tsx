import React from 'react';
import Link from 'next/link';

interface TagsCloudProps {
  tags: string[];
}

export default function TagsCloud({ tags }: TagsCloudProps) {
  // Use a basic algorithm to assign tag sizes based on alphabetical order
  // In a real app, you would size based on frequency/popularity
  const getTagSize = (index: number): string => {
    const sizes = [
      'text-xs', 'text-sm', 'text-base', 'text-lg'
    ];
    return sizes[index % sizes.length] || 'text-sm';
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Link
          key={tag}
          href={`/blog/tag/${encodeURIComponent(tag)}`}
          className={`
            ${getTagSize(index)} 
            inline-block px-3 py-1 rounded-full
            bg-gray-100 text-gray-800
            hover:bg-primary-50 hover:text-primary-700 transition-colors
          `}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
} 