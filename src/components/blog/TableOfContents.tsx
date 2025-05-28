'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from the article
  useEffect(() => {
    const articleHeadings = Array.from(document.querySelectorAll('.blog-h2, .blog-h3'))
      .map((element) => {
        const id = element.id;
        const text = element.textContent?.replace('#', '') || '';
        const level = element.tagName === 'H2' ? 2 : 3;
        
        return { id, text, level };
      })
      .filter(heading => heading.id && heading.text.trim().length > 0);
    
    setHeadings(articleHeadings);
  }, []);

  // Track active heading during scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0 
      }
    );

    // Observe all section headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn('', className)}>
      <h3 className="text-lg font-bold mb-4 text-gray-900 border-r-4 border-primary-500 pr-3">محتويات المقال</h3>
      <nav className="toc">
        <ul className="space-y-2 text-gray-700 text-sm">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              className={cn(
                "border-r border-gray-300 pr-3 py-1 transition-colors",
                heading.level === 3 ? "mr-3" : "",
                activeId === heading.id
                  ? "border-primary-500 text-primary-700"
                  : "hover:border-primary-400 hover:text-primary-600"
              )}
            >
              <a 
                href={`#${heading.id}`}
                className={cn(
                  "block",
                  heading.level === 3 ? "text-xs opacity-90" : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 