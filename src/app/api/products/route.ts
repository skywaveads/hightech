import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { Product } from '@/types/product';
import { initialProducts } from '@/data/products';

export const dynamic = 'force-dynamic';

// Simple in-memory cache with shorter duration for faster updates
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes for faster refresh

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('isActive');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let products: Product[];

    // Check cache first
    const now = Date.now();
    if (cachedProducts && (now - cacheTimestamp) < CACHE_DURATION) {
      products = cachedProducts;
    } else {
      try {
        // Try to get from Google Sheets
        products = await GoogleSheetsProductsDatabase.getAllProducts();
        
        // Update cache
        cachedProducts = products;
        cacheTimestamp = now;
      } catch (sheetsError) {
        console.warn('Google Sheets failed, using fallback data:', sheetsError);
        
        // Use fallback data if Google Sheets fails
        products = initialProducts;
        
        // Don't cache fallback data to allow retry
      }
    }

    // Apply filters if provided
    if (category) {
      products = products.filter(product => product.category === category);
    }

    if (active !== null) {
      const isActive = active === 'true';
      products = products.filter(product => product.isActive === isActive);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        product =>
          product.name_ar.toLowerCase().includes(searchLower) ||
          product.name_en.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply limit if provided
    if (limit && !isNaN(limit)) {
      products = products.slice(0, limit);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in products GET:', error);
    
    // Return fallback data even on error
    let fallbackProducts = initialProducts;
    
    // Apply same filters to fallback data
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('isActive');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (category) {
      fallbackProducts = fallbackProducts.filter(product => product.category === category);
    }

    if (active !== null) {
      const isActive = active === 'true';
      fallbackProducts = fallbackProducts.filter(product => product.isActive === isActive);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      fallbackProducts = fallbackProducts.filter(
        product =>
          product.name_ar.toLowerCase().includes(searchLower) ||
          product.name_en.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (limit && !isNaN(limit)) {
      fallbackProducts = fallbackProducts.slice(0, limit);
    }

    return NextResponse.json(fallbackProducts);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    // For a real app, implement proper authentication middleware
    
    const productData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name_ar', 'name_en', 'slug', 'price', 'sku', 'category'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Add the product
    const newProduct = await GoogleSheetsProductsDatabase.addProduct(productData);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error in products POST:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated
    // For a real app, implement proper authentication middleware
    
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    
    if (!ids) {
      return NextResponse.json(
        { error: 'Missing product IDs' },
        { status: 400 }
      );
    }
    
    const productIds = ids.split(',');
    const deletedCount = await GoogleSheetsProductsDatabase.deleteProducts(productIds);
    
    return NextResponse.json({ deletedCount });
  } catch (error) {
    console.error('Error in products DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete products' },
      { status: 500 }
    );
  }
} 