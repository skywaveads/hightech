import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BlogPostWithAuthor } from '@/types/blog';

interface BlogCardProps {
  post: BlogPostWithAuthor;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format the publish date as "X days ago" in Arabic
  const formattedDate = formatDistanceToNow(parseISO(post.publishedAt), {
    addSuffix: true,
    locale: ar,
  });
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Blog Card Image */}
      <Link href={`/blog/${post.slug}`} className="block aspect-video relative">
        <Image
          src={post.coverImage}
          alt={post.titleAr}
          fill
          className="object-cover"
          loading="lazy"
        />
      </Link>
      
      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.titleAr}
          </Link>
        </h2>
        
        {/* Meta Info: Author & Date */}
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden relative mr-2">
              <Image
                src={post.author.image}
                alt={post.author.nameAr}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <span>{post.author.nameAr}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.descriptionAr}
        </p>
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
        >
          اقرأ المزيد
          <svg 
            className="w-4 h-4 mr-1 rtl:rotate-180" 
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
      </div>
    </article>
  );
} 