import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await GoogleSheetsProductsDatabase.getProductById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error(`Error in product GET for ID ${params.id}:`, error);
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
    // Check if user is authenticated
    // For a real app, implement proper authentication middleware
    
    const productData = await request.json();
    const success = await GoogleSheetsProductsDatabase.updateProduct(params.id, productData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const updatedProduct = await GoogleSheetsProductsDatabase.getProductById(params.id);
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(`Error in product PUT for ID ${params.id}:`, error);
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
    // Check if user is authenticated
    // For a real app, implement proper authentication middleware
    
    const result = await GoogleSheetsProductsDatabase.deleteProduct(params.id);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in product DELETE for ID ${params.id}:`, error);
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
    // Check if user is authenticated
    // For a real app, implement proper authentication middleware
    
    const { action } = await request.json();
    
    if (action === 'toggle-status') {
      const updatedProduct = await GoogleSheetsProductsDatabase.toggleProductStatus(params.id);
      
      if (!updatedProduct) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(updatedProduct);
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error(`Error in product PATCH for ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to perform action on product' },
      { status: 500 }
    );
  }
} 