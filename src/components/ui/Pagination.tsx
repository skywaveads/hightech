import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Add current page and pages around it
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Always include last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Add ellipses where needed
    const result = [];
    let prev = 0;
    
    for (const page of pages) {
      if (page - prev > 1) {
        result.push('ellipsis');
      }
      result.push(page);
      prev = page;
    }
    
    return result;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="flex justify-center" aria-label="صفحات المدونة">
      <ul className="inline-flex space-x-1 rtl:space-x-reverse">
        {/* Previous Page Button */}
        <li>
          <Link
            href={getPageUrl(Math.max(1, currentPage - 1))}
            className={`
              px-3 py-2 rounded-md flex items-center 
              ${currentPage <= 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-200'}
            `}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          >
            <svg 
              className="w-5 h-5 rtl:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            <span className="sr-only">الصفحة السابقة</span>
          </Link>
        </li>
        
        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          page === 'ellipsis' ? (
            <li key={`ellipsis-${index}`}>
              <span className="px-3 py-2 text-gray-500">...</span>
            </li>
          ) : (
            <li key={page}>
              <Link
                href={getPageUrl(page as number)}
                className={`
                  px-4 py-2 rounded-md 
                  ${page === currentPage
                    ? 'bg-primary-600 text-white font-medium' 
                    : 'text-gray-700 hover:bg-gray-200'}
                `}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            </li>
          )
        ))}
        
        {/* Next Page Button */}
        <li>
          <Link
            href={getPageUrl(Math.min(totalPages, currentPage + 1))}
            className={`
              px-3 py-2 rounded-md flex items-center 
              ${currentPage >= totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-200'}
            `}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
          >
            <svg 
              className="w-5 h-5 rtl:rotate-180" 
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
            <span className="sr-only">الصفحة التالية</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
} 