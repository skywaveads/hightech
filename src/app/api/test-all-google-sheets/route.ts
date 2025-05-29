import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const results = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
    summary: {} as any
  };

  // Test 1: Google Products
  try {
    console.log('[TestAllGoogleSheets] Testing Google Products...');
    const { GoogleSheetsProductsDatabase } = await import('@/lib/google-products');
    const products = await GoogleSheetsProductsDatabase.getAllProducts();
    results.tests.push({
      module: 'google-products',
      status: 'success',
      message: `Retrieved ${products.length} products`,
      data: products.slice(0, 2) // Show first 2 products
    });
  } catch (error) {
    results.tests.push({
      module: 'google-products',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error
    });
  }

  // Test 2: Google Orders
  try {
    console.log('[TestAllGoogleSheets] Testing Google Orders...');
    const { getAllOrders } = await import('@/lib/google-orders');
    const orders = await getAllOrders();
    results.tests.push({
      module: 'google-orders',
      status: 'success',
      message: `Retrieved ${orders.length} orders`,
      data: orders.slice(0, 2) // Show first 2 orders
    });
  } catch (error) {
    results.tests.push({
      module: 'google-orders',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error
    });
  }

  // Test 3: Google Sheets (Comments)
  try {
    console.log('[TestAllGoogleSheets] Testing Google Sheets Comments...');
    const { GoogleSheetsDatabase } = await import('@/lib/google-sheets');
    const comments = await GoogleSheetsDatabase.getAllComments(1, 5);
    results.tests.push({
      module: 'google-sheets',
      status: 'success',
      message: `Retrieved ${comments.comments.length} comments out of ${comments.total} total`,
      data: comments.comments.slice(0, 2) // Show first 2 comments
    });
  } catch (error) {
    results.tests.push({
      module: 'google-sheets',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error
    });
  }

  // Summary
  const successCount = results.tests.filter(t => t.status === 'success').length;
  const totalCount = results.tests.length;
  
  results.summary = {
    total: totalCount,
    success: successCount,
    failed: totalCount - successCount,
    allWorking: successCount === totalCount
  };

  console.log('[TestAllGoogleSheets] Test Summary:', results.summary);

  return NextResponse.json(results, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}