"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

const ProductRange: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?isActive=true&limit=6');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Handle new API response structure
        if (data && data.success && data.products && Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 6)); // Ensure we only take 6 products
        } else if (data && Array.isArray(data)) {
          // Fallback for old API response format
          setProducts(data.slice(0, 6));
        } else {
          console.warn('No products found in API response');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Section id="products">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          مجموعة منتجات <span className="text-primary-600">هاي كت</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          اختر من بين مجموعة واسعة من أجهزة الكتر بلوتر المصممة لتلبية احتياجات مختلف الصناعات والتطبيقات
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حالياً</p>
            </div>
          )}
        </div>
      )}
      
      <div className="text-center mt-12">
        <Button variant="default" size="lg" asChild>
          <Link href="/products">
            عرض كل المنتجات
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default ProductRange; 