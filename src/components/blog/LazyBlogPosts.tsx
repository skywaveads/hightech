'use client';

import React, { useState, useEffect, useRef } from 'react';
import BlogCard from './BlogCard';
import { BlogPostWithAuthor } from '@/types/blog';

interface LazyBlogPostsProps {
  posts: BlogPostWithAuthor[];
}

// عدد المقالات التي يتم تحميلها في كل مرة
const BATCH_SIZE = 6;

export default function LazyBlogPosts({ posts }: LazyBlogPostsProps) {
  // عدد المقالات المعروضة حالياً
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  // مرجع للعنصر الذي يتم مراقبته للتحميل الإضافي
  const loadMoreRef = useRef<HTMLDivElement>(null);
  // مؤشر التحميل
  const [isLoading, setIsLoading] = useState(false);
  // هل تم تحميل جميع المقالات؟
  const allLoaded = visibleCount >= posts.length;

  useEffect(() => {
    // إنشاء متابع للعنصر
    const observer = new IntersectionObserver(
      (entries) => {
        // إذا كان العنصر مرئياً وتوجد مقالات إضافية للتحميل
        if (entries[0]?.isIntersecting && !allLoaded && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 } // نسبة الرؤية المطلوبة للتحميل (10%)
    );

    // بدء متابعة العنصر
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // إيقاف المتابعة عند إزالة المكون
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, allLoaded, isLoading]);

  // وظيفة تحميل المزيد من المقالات
  const loadMorePosts = () => {
    setIsLoading(true);
    
    // محاكاة تأخير قصير للعملية (يمكن إزالة setTimeout في الإنتاج)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + BATCH_SIZE, posts.length));
      setIsLoading(false);
    }, 300);
  };

  // المقالات المرئية حالياً
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* شبكة المقالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visiblePosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* عنصر التحميل الإضافي */}
      {!allLoaded && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">جاري تحميل المزيد من المقالات...</span>
            </div>
          ) : (
            <button 
              onClick={loadMorePosts}
              className="bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold py-2 px-6 rounded-lg border border-primary-200 transition-colors"
            >
              عرض المزيد من المقالات
            </button>
          )}
        </div>
      )}

      {/* رسالة عند اكتمال تحميل جميع المقالات */}
      {allLoaded && posts.length > BATCH_SIZE && (
        <div className="text-center py-4">
          <p className="text-gray-500">تم عرض جميع المقالات ({posts.length})</p>
        </div>
      )}
    </div>
  );
} 