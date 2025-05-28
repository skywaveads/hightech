'use client';

import { Suspense } from 'react';
import Header from './Header';

// Loading component للـ Header
function HeaderSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="w-32 h-8 bg-white/20 rounded animate-pulse"></div>
          <div className="hidden lg:flex space-x-8 space-x-reverse">
            <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function HeaderWrapper() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />
    </Suspense>
  );
}