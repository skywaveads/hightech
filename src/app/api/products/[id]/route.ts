import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[ProductAPI] Looking for product with ID: ${params.id}`);
    
    // Use Google Sheets exclusively - no local data fallback
    try {
      const products = await GoogleSheetsProductsDatabase.getAllProducts();
      console.log(`[ProductAPI] Retrieved ${products.length} products from Google Sheets`);
      
      const product = products.find((p: Product) => 
        p._id === params.id || p.slug === params.id
      );
      
      if (!product) {
        console.log(`[ProductAPI] Product not found in Google Sheets: ${params.id}`);
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      console.log(`[ProductAPI] Found product in Google Sheets: ${product.name_ar}`);
      return NextResponse.json(product);
    } catch (sheetsError) {
      console.error('[ProductAPI] Google Sheets error:', sheetsError);
      return NextResponse.json(
        { error: 'Failed to fetch product from Google Sheets' },
        { status: 500 }
      );
    }
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
    
    try {
      const products = await GoogleSheetsProductsDatabase.getAllProducts();
      const product = products.find((p: Product) => 
        p._id === params.id || p.slug === params.id
      );
      
      if (!product) {
        console.log(`[ProductAPI] Product not found for update: ${params.id}`);
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      const updateData = await request.json();
      console.log(`[ProductAPI] Updating product ${params.id} with data:`, updateData);
      
      // Update product in Google Sheets
      const success = await GoogleSheetsProductsDatabase.updateProduct(params.id, updateData);
      
      if (!success) {
        console.error(`[ProductAPI] Failed to update product in Google Sheets: ${params.id}`);
        return NextResponse.json(
          { error: 'Failed to update product in Google Sheets' },
          { status: 500 }
        );
      }
      
      // Get updated product
      const updatedProduct = await GoogleSheetsProductsDatabase.getProductById(params.id);
      console.log(`[ProductAPI] Successfully updated product in Google Sheets: ${params.id}`);
      
      return NextResponse.json(updatedProduct);
    } catch (sheetsError) {
      console.error('[ProductAPI] Google Sheets update error:', sheetsError);
      return NextResponse.json(
        { error: 'Failed to update product in Google Sheets' },
        { status: 500 }
      );
    }
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
    
    try {
      const products = await GoogleSheetsProductsDatabase.getAllProducts();
      const product = products.find((p: Product) => 
        p._id === params.id || p.slug === params.id
      );
      
      if (!product) {
        console.log(`[ProductAPI] Product not found for deletion: ${params.id}`);
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Delete product from Google Sheets
      const success = await GoogleSheetsProductsDatabase.deleteProduct(params.id);
      
      if (!success) {
        console.error(`[ProductAPI] Failed to delete product from Google Sheets: ${params.id}`);
        return NextResponse.json(
          { error: 'Failed to delete product from Google Sheets' },
          { status: 500 }
        );
      }
      
      console.log(`[ProductAPI] Successfully deleted product from Google Sheets: ${params.id}`);
      return NextResponse.json({ success: true });
    } catch (sheetsError) {
      console.error('[ProductAPI] Google Sheets delete error:', sheetsError);
      return NextResponse.json(
        { error: 'Failed to delete product from Google Sheets' },
        { status: 500 }
      );
    }
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
      try {
        const products = await GoogleSheetsProductsDatabase.getAllProducts();
        const product = products.find((p: Product) => 
          p._id === params.id || p.slug === params.id
        );
        
        if (!product) {
          console.log(`[ProductAPI] Product not found for status toggle: ${params.id}`);
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          );
        }
        
        // Toggle product status in Google Sheets
        const success = await GoogleSheetsProductsDatabase.updateProduct(params.id, { 
          isActive: !product.isActive 
        });
        
        if (!success) {
          console.error(`[ProductAPI] Failed to toggle product status in Google Sheets: ${params.id}`);
          return NextResponse.json(
            { error: 'Failed to toggle product status in Google Sheets' },
            { status: 500 }
          );
        }
        
        // Get updated product
        const updatedProduct = await GoogleSheetsProductsDatabase.getProductById(params.id);
        console.log(`[ProductAPI] Successfully toggled product status in Google Sheets: ${params.id}`);
        
        return NextResponse.json(updatedProduct);
      } catch (sheetsError) {
        console.error('[ProductAPI] Google Sheets toggle error:', sheetsError);
        return NextResponse.json(
          { error: 'Failed to toggle product status in Google Sheets' },
          { status: 500 }
        );
      }
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