import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsDatabase } from '@/lib/google-sheets';
import { GoogleSheetsProductsDatabase } from '@/lib/google-products';
import { getAllOrders, addOrderToSheet, updateOrderStatus, deleteOrderFromSheet } from '@/lib/google-orders';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request);
    if (!authResult || !authResult.email) {
      return NextResponse.json({
        error: 'Unauthorized',
        message: 'Admin authentication required'
      }, { status: 401 });
    }

    const results = {
      timestamp: new Date().toISOString(),
      environment: {
        GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        GOOGLE_SHEETS_SHEET_ID: !!process.env.GOOGLE_SHEETS_SHEET_ID,
        PRODUCTS_SHEET_ID: !!process.env.PRODUCTS_SHEET_ID,
        ORDERS_SHEET_ID: !!process.env.ORDERS_SHEET_ID,
        GOOGLE_DRIVE_FOLDER_ID: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
      },
      environmentValues: {
        GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID,
        PRODUCTS_SHEET_ID: process.env.PRODUCTS_SHEET_ID,
        ORDERS_SHEET_ID: process.env.ORDERS_SHEET_ID,
        CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      },
      tests: {
        comments: { success: false, error: null as string | null, data: null as any },
        products: { success: false, error: null as string | null, data: null as any },
        orders: { success: false, error: null as string | null, data: null as any }
      }
    };

    // Test Comments Sheet
    console.log('[TestAllSheets] Testing Comments Sheet...');
    try {
      const comments = await GoogleSheetsDatabase.getAllComments(1, 5);
      results.tests.comments = {
        success: true,
        error: null,
        data: {
          total: comments.total,
          commentsCount: comments.comments.length,
          sampleComment: comments.comments[0] || null
        }
      };
      console.log('[TestAllSheets] Comments test successful');
    } catch (error) {
      console.error('[TestAllSheets] Comments test failed:', error);
      results.tests.comments = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        data: null
      };
    }

    // Test Products Sheet
    console.log('[TestAllSheets] Testing Products Sheet...');
    try {
      const products = await GoogleSheetsProductsDatabase.getAllProducts();
      results.tests.products = {
        success: true,
        error: null,
        data: {
          productsCount: products.length,
          sampleProduct: products[0] || null
        }
      };
      console.log('[TestAllSheets] Products test successful');
    } catch (error) {
      console.error('[TestAllSheets] Products test failed:', error);
      results.tests.products = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        data: null
      };
    }

    // Test Orders Sheet
    console.log('[TestAllSheets] Testing Orders Sheet...');
    try {
      const orders = await getAllOrders();
      results.tests.orders = {
        success: true,
        error: null,
        data: {
          ordersCount: orders.length,
          sampleOrder: orders[0] || null
        }
      };
      console.log('[TestAllSheets] Orders test successful');
    } catch (error) {
      console.error('[TestAllSheets] Orders test failed:', error);
      results.tests.orders = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        data: null
      };
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('[TestAllSheets] General error:', error);
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdmin(request);
    if (!authResult || !authResult.email) {
      return NextResponse.json({
        error: 'Unauthorized',
        message: 'Admin authentication required'
      }, { status: 401 });
    }

    const { operation, type, data } = await request.json();

    const results = {
      timestamp: new Date().toISOString(),
      operation,
      type,
      success: false,
      error: null as string | null,
      data: null as any
    };

    console.log(`[TestAllSheets] Testing ${operation} operation on ${type}`);

    switch (type) {
      case 'comments':
        if (operation === 'create') {
          const comment = await GoogleSheetsDatabase.addComment({
            productId: data.productId || 'test-product',
            userName: data.userName || 'Test User',
            userEmail: data.userEmail || 'test@example.com',
            rating: data.rating || 5,
            title: data.title || 'Test Comment',
            comment: data.comment || 'This is a test comment',
            pros: data.pros || ['Good quality'],
            cons: data.cons || [],
            verified: data.verified || false,
            status: data.status || 'pending',
            helpful: { count: 0, users: [] }
          });
          results.success = true;
          results.data = comment;
        } else if (operation === 'update' && data.id) {
          const success = await GoogleSheetsDatabase.updateComment(data.id, {
            status: data.status || 'active',
            title: data.title || 'Updated Test Comment'
          });
          results.success = success;
          results.data = { updated: success };
        } else if (operation === 'delete' && data.id) {
          const success = await GoogleSheetsDatabase.deleteComment(data.id);
          results.success = success;
          results.data = { deleted: success };
        }
        break;

      case 'products':
        if (operation === 'create') {
          const product = await GoogleSheetsProductsDatabase.addProduct({
            name_ar: data.name_ar || 'منتج تجريبي',
            name_en: data.name_en || 'Test Product',
            slug: data.slug || 'test-product',
            short_desc: data.short_desc || 'وصف قصير',
            description: data.description || 'وصف المنتج',
            price: data.price || 100,
            sale_price: data.sale_price || null,
            quantity: data.quantity || 10,
            category: data.category || 'test',
            tags: data.tags || ['test'],
            sku: data.sku || 'TEST-001',
            images: data.images || [],
            isActive: data.isActive !== undefined ? data.isActive : true
          });
          results.success = true;
          results.data = product;
        } else if (operation === 'update' && data.id) {
          const success = await GoogleSheetsProductsDatabase.updateProduct(data.id, {
            name_ar: data.name_ar || 'منتج محدث',
            price: data.price || 150
          });
          results.success = success;
          results.data = { updated: success };
        } else if (operation === 'delete' && data.id) {
          const success = await GoogleSheetsProductsDatabase.deleteProduct(data.id);
          results.success = success;
          results.data = { deleted: success };
        }
        break;

      case 'orders':
        if (operation === 'create') {
          const orderData = {
            id: `test-${Date.now()}`,
            orderNumber: `TEST-${Date.now()}`,
            customer: {
              firstName: data.customer?.firstName || 'Test',
              lastName: data.customer?.lastName || 'User',
              email: data.customer?.email || 'test@example.com',
              phone: data.customer?.phone || '1234567890',
              country: data.customer?.country || 'Egypt',
              countryCode: data.customer?.countryCode || 'EG',
              dialCode: data.customer?.dialCode || '+20',
              city: data.customer?.city || 'Cairo',
              address: data.customer?.address || 'Test Address',
              postalCode: data.customer?.postalCode || '12345',
              notes: data.customer?.notes || 'Test order'
            },
            items: data.items || [{
              productId: 'test-product',
              productName: 'Test Product',
              productNameEn: 'Test Product',
              price: 100,
              quantity: 1,
              total: 100
            }],
            subtotal: data.subtotal || 100,
            shipping: data.shipping || 50,
            total: data.total || 150,
            status: data.status || 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          const result = await addOrderToSheet(orderData);
          results.success = result.success;
          results.data = result;
        } else if (operation === 'update' && data.orderNumber) {
          const result = await updateOrderStatus(data.orderNumber, data.status || 'confirmed');
          results.success = result.success;
          results.data = result;
        } else if (operation === 'delete' && data.orderNumber) {
          const result = await deleteOrderFromSheet(data.orderNumber);
          results.success = result.success;
          results.data = result;
        }
        break;

      default:
        throw new Error(`Unknown type: ${type}`);
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('[TestAllSheets] Operation error:', error);
    return NextResponse.json({
      error: 'Operation failed',
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}