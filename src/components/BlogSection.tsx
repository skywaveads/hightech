"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getAllPosts } from '@/lib/blog-service';
import { authors } from '@/data/authors';
import { BlogPost } from '@/types/blog';

interface BlogPostWithAuthor extends BlogPost {
  authorName: string;
  category: string;
}

const BlogSection: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        const postsWithAuthors = posts.slice(0, 3).map(post => {
          const author = authors.find(a => a.id === post.authorId);
          // Ensure category is always a string
          let category = 'عام'; // Default category
          if (post.tagsAr && post.tagsAr.length > 0 && typeof post.tagsAr[0] === 'string') {
            category = post.tagsAr[0];
          }
          return {
            ...post,
            authorName: author ? author.nameAr : 'غير معروف',
            category: category,
          };
        });
        setFeaturedPosts(postsWithAuthors);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        // Optionally set some default/fallback posts or an error state
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <AnimatedSection className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">جاري تحميل المقالات...</p>
        </div>
      </AnimatedSection>
    );
  }

  if (featuredPosts.length === 0) {
    return (
      <AnimatedSection className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">لا توجد مقالات لعرضها حالياً.</p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            أحدث المقالات والنصائح
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف أحدث الاتجاهات والنصائح المفيدة في عالم أجهزة كتر بلوتر والطباعة الرقمية
          </p>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post: BlogPostWithAuthor, index: number) => (
            <AnimatedSection
              key={post.slug}
              animation="fadeInUp"
              delay={index * 150}
              className="group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                {/* Post Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.coverImage.replace('/public', '')}
                    alt={post.titleAr || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime} دقائق</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.titleAr || post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.descriptionAr || post.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>اقرأ المزيد</span>
                    <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection animation="fadeInUp" className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>عرض جميع المقالات</span>
            <ArrowRight className="h-5 w-5 mr-3" />
          </Link>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default BlogSection;