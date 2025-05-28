"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center space-x-2 space-x-reverse flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <li className="flex items-center">
                <ChevronLeft className="h-4 w-4 text-gray-400 mx-1" />
              </li>
            )}
            <li className={`${item.active ? 'text-primary font-medium' : 'text-gray-600'}`}>
              {item.active ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 