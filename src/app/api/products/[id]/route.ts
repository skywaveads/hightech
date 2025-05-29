import { NextRequest, NextResponse } from 'next/server';
import { initialProducts } from '@/data/products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[ProductAPI] Looking for product with ID: ${params.id}`);
    
    // Use local data directly - no Google Sheets dependency
    const product = initialProducts.find((p: Product) => 
      p._id === params.id || p.slug === params.id
    );
    
    if (!product) {
      console.log(`[ProductAPI] Product not found: ${params.id}`);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    console.log(`[ProductAPI] Found product: ${product.name_ar}`);
    return NextResponse.json(product);
  } catch (error) {
    console.error(`[ProductAPI] Error getting product ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[ProductAPI] PUT request for product: ${params.id}`);
    
    // For now, return success without actual update
    // In a real implementation, this would update the data source
    const product = initialProducts.find((p: Product) => 
      p._id === params.id || p.slug === params.id
    );
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Return the existing product (no actual update for local data)
    return NextResponse.json(product);
  } catch (error) {
    console.error(`[ProductAPI] Error updating product ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[ProductAPI] DELETE request for product: ${params.id}`);
    
    // For now, return success without actual deletion
    const product = initialProducts.find((p: Product) => 
      p._id === params.id || p.slug === params.id
    );
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[ProductAPI] Error deleting product ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[ProductAPI] PATCH request for product: ${params.id}`);
    
    const { action } = await request.json();
    
    if (action === 'toggle-status') {
      const product = initialProducts.find((p: Product) => 
        p._id === params.id || p.slug === params.id
      );
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Return product with toggled status (no actual update for local data)
      const updatedProduct = { ...product, isActive: !product.isActive };
      return NextResponse.json(updatedProduct);
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error(`[ProductAPI] Error in PATCH for product ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to perform action on product' },
      { status: 500 }
    );
  }
}