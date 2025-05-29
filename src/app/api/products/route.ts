import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

// Temporary fallback products for debugging
const fallbackProducts: Product[] = [
  {
    _id: "temp-1",
    name_ar: "ماكينة قطع فينيل احترافية 60 سم",
    name_en: "Professional Vinyl Cutting Machine 60cm",
    slug: "professional-cutter-plotter-60cm",
    short_desc: "ماكينة قطع فينيل احترافية بعرض 60 سم مثالية للمشاريع الصغيرة والمتوسطة",
    description: "ماكينة قطع فينيل احترافية عالية الجودة بعرض 60 سم، مثالية للمشاريع الصغيرة والمتوسطة. تتميز بدقة عالية في القطع وسهولة الاستخدام.",
    price: 2500,
    sale_price: 2200,
    quantity: 10,
    category: "cutting-machines",
    tags: ["vinyl", "cutting", "machine", "professional"],
    sku: "VCM-60-PRO",
    images: [
      {
        url: "https://drive.google.com/uc?export=view&id=1example1",
        alt: "ماكينة قطع فينيل احترافية 60 سم"
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "temp-2", 
    name_ar: "فينيل لاصق عالي الجودة",
    name_en: "High Quality Adhesive Vinyl",
    slug: "high-quality-adhesive-vinyl",
    short_desc: "فينيل لاصق عالي الجودة متوفر بألوان متعددة",
    description: "فينيل لاصق عالي الجودة مقاوم للماء والأشعة فوق البنفسجية، متوفر بألوان متعددة ومناسب لجميع أنواع التطبيقات.",
    price: 45,
    sale_price: null,
    quantity: 100,
    category: "vinyl-materials",
    tags: ["vinyl", "adhesive", "waterproof", "uv-resistant"],
    sku: "VINYL-ADH-HQ",
    images: [
      {
        url: "https://drive.google.com/uc?export=view&id=1example2",
        alt: "فينيل لاصق عالي الجودة"
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    console.log('[ProductsAPI] Starting products fetch...');
    
    // Try Google Sheets first
    try {
      console.log('[ProductsAPI] Attempting Google Sheets connection...');
      const products = await GoogleSheetsProductsDatabase.getAllProducts();
      
      if (products && products.length > 0) {
        console.log(`[ProductsAPI] Successfully retrieved ${products.length} products from Google Sheets`);
        return NextResponse.json({
          success: true,
          source: 'google_sheets',
          count: products.length,
          products: products
        });
      } else {
        console.warn('[ProductsAPI] Google Sheets returned empty array');
        throw new Error('No products found in Google Sheets');
      }
    } catch (sheetsError: any) {
      console.error('[ProductsAPI] Google Sheets error:', {
        message: sheetsError.message,
        stack: sheetsError.stack,
        name: sheetsError.name
      });
      
      // Return fallback data with detailed error info
      console.log('[ProductsAPI] Using fallback products due to Google Sheets error');
      return NextResponse.json({
        success: false,
        source: 'fallback',
        error: {
          message: sheetsError.message,
          type: 'google_sheets_error',
          timestamp: new Date().toISOString()
        },
        count: fallbackProducts.length,
        products: fallbackProducts,
        debug: {
          environment_variables: {
            GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
            GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            PRODUCTS_SHEET_ID: !!process.env.PRODUCTS_SHEET_ID,
            values: {
              GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
              PRODUCTS_SHEET_ID: process.env.PRODUCTS_SHEET_ID,
              PRIVATE_KEY_LENGTH: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length || 0
            }
          }
        }
      }, { status: 200 }); // Return 200 with fallback data
    }
  } catch (error: any) {
    console.error('[ProductsAPI] Critical error:', error);
    
    return NextResponse.json({
      success: false,
      source: 'error',
      error: {
        message: error.message,
        type: 'critical_error',
        timestamp: new Date().toISOString()
      },
      count: fallbackProducts.length,
      products: fallbackProducts
    }, { status: 200 }); // Return 200 with fallback data even on critical error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[ProductsAPI] POST request received');
    
    const productData = await request.json();
    console.log('[ProductsAPI] Adding new product:', productData.name_ar);
    
    try {
      const newProduct = await GoogleSheetsProductsDatabase.addProduct(productData);
      console.log('[ProductsAPI] Product added successfully to Google Sheets:', newProduct._id);
      
      return NextResponse.json({
        success: true,
        source: 'google_sheets',
        product: newProduct
      });
    } catch (sheetsError: any) {
      console.error('[ProductsAPI] Error adding product to Google Sheets:', sheetsError);
      
      return NextResponse.json({
        success: false,
        error: {
          message: sheetsError.message,
          type: 'google_sheets_error'
        }
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[ProductsAPI] Error in POST:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        type: 'request_error'
      }
    }, { status: 500 });
  }
}