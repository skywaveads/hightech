import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Products API called - using Google Sheets only');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('isActive');
    const search = searchParams.get('search');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    console.log('📋 Query params:', { category, active, search, limit });

    // Get products from Google Sheets only
    console.log('📊 Fetching products from Google Sheets...');
    const products = await GoogleSheetsProductsDatabase.getAllProducts();
    console.log(`📦 Retrieved ${products.length} products from Google Sheets`);

    // Apply filters if provided
    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
      console.log(`🏷️ Filtered by category '${category}': ${filteredProducts.length} products`);
    }

    if (active !== null) {
      const isActive = active === 'true';
      filteredProducts = filteredProducts.filter(product => product.isActive === isActive);
      console.log(`✅ Filtered by active status '${isActive}': ${filteredProducts.length} products`);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.name_ar.toLowerCase().includes(searchLower) ||
          product.name_en.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
      console.log(`🔍 Filtered by search '${search}': ${filteredProducts.length} products`);
    }

    // Apply limit if provided
    if (limit && !isNaN(limit)) {
      filteredProducts = filteredProducts.slice(0, limit);
      console.log(`📏 Limited to ${limit}: ${filteredProducts.length} products`);
    }

    console.log(`✅ Returning ${filteredProducts.length} products from Google Sheets`);
    return NextResponse.json(filteredProducts);
    
  } catch (error) {
    console.error('❌ Error in products GET:', error);
    
    // Return error instead of fallback data
    return NextResponse.json(
      {
        error: 'Failed to fetch products from Google Sheets',
        message: 'تعذر جلب البيانات من Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
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