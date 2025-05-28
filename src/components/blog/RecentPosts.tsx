import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

interface RecentPostsProps {
  posts: BlogPost[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => {
        // Format the publish date as "X days ago" in Arabic
        const formattedDate = formatDistanceToNow(parseISO(post.publishedAt), {
          addSuffix: true,
          locale: ar,
        });
        
        return (
          <li key={post.slug} className="flex items-start space-x-3 rtl:space-x-reverse">
            {/* Post Thumbnail */}
            <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.titleAr}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </Link>
            
            {/* Post Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 mb-1">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {post.titleAr}
                </Link>
              </h3>
              <time dateTime={post.publishedAt} className="text-xs text-gray-500">
                {formattedDate}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
} 