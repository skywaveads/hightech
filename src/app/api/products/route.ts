import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

// JWT verification for API routes
const JWT_SECRET = process.env.JWT_SECRET || 'g#Pz7@rM!aW^84qL*v2ZxT$kNdYh1sB9';

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

function verifyToken(token: string): any {
  if (!JWT_SECRET) {
    return null;
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(parts[1]));
    
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

function checkAuthentication(request: NextRequest): { authenticated: boolean; user?: any; error?: string } {
  const token = cookies().get('token')?.value;
  
  if (!token) {
    return { authenticated: false, error: 'No token provided' };
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { authenticated: false, error: 'Invalid token' };
  }
  
  return { authenticated: true, user: decoded };
}

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
        url: "/images/products_hero/1.jpg",
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
        url: "/images/products_hero/2.jpg",
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
    
    // Check if this is an admin request (has authentication headers)
    const isAdminRequest = request.headers.get('X-Requested-With') === 'XMLHttpRequest';
    
    if (isAdminRequest) {
      // Verify authentication for admin requests
      const authCheck = checkAuthentication(request);
      if (!authCheck.authenticated) {
        return NextResponse.json(
          {
            success: false,
            error: 'Authentication required for admin access',
            code: 'UNAUTHORIZED'
          },
          { status: 401 }
        );
      }
      console.log('[ProductsAPI] Admin authenticated:', authCheck.user?.email);
    }
    
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
    
    // Verify authentication for POST requests (admin only)
    const authCheck = checkAuthentication(request);
    if (!authCheck.authenticated) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required for product creation',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }
    
    console.log('[ProductsAPI] Admin authenticated for POST:', authCheck.user?.email);
    
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