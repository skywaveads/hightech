'use client';

import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}