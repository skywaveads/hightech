import { NextRequest, NextResponse } from 'next/server';
import { 
  getOrderByOrderNumber, 
  updateOrderInSheet, 
  deleteOrderFromSheet,
  updateOrderStatus // Keep if direct status update is preferred for PATCH
} from '@/lib/google-orders';
import { Order } from '@/types/order';
// import { verifyAdmin } from '@/lib/auth'; // Placeholder for admin auth

export const dynamic = 'force-dynamic';

// GET - Fetch a single order by orderNumber
export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  // const isAdmin = await verifyAdmin(request);
  // if (!isAdmin) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const order = await getOrderByOrderNumber(params.orderNumber);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error(`[API Order Admin GET] Error fetching order ${params.orderNumber}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch order', details: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update an order by orderNumber
export async function PUT(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  // const isAdmin = await verifyAdmin(request);
  // if (!isAdmin) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const orderData: Partial<Order> = await request.json();
    
    // Ensure items are not accidentally stringified if passed directly
    if (orderData.items && typeof orderData.items === 'string') {
        try {
            orderData.items = JSON.parse(orderData.items);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid items format. Must be a valid JSON array string or an array of objects.' }, { status: 400});
        }
    }


    const result = await updateOrderInSheet(params.orderNumber, orderData);
    
    if (!result.success) {
      // updateOrderInSheet throws an error if order not found, so this might not be hit often
      return NextResponse.json(
        { error: result.message || 'Order not found or update failed' },
        { status: 404 } 
      );
    }
    
    const updatedOrder = await getOrderByOrderNumber(params.orderNumber);
    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error(`[API Order Admin PUT] Error updating order ${params.orderNumber}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to update order', details: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete an order by orderNumber
export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  // const isAdmin = await verifyAdmin(request);
  // if (!isAdmin) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const result = await deleteOrderFromSheet(params.orderNumber);
    
    if (!result.success) {
      // deleteOrderFromSheet throws an error if order not found
      return NextResponse.json(
        { error: result.message || 'Order not found or delete failed' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error(`[API Order Admin DELETE] Error deleting order ${params.orderNumber}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to delete order', details: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH - For partial updates, e.g., just updating status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  // const isAdmin = await verifyAdmin(request);
  // if (!isAdmin) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
  try {
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required for PATCH operation' }, { status: 400 });
    }
    
    // Use updateOrderStatus for dedicated status updates
    // Or use updateOrderInSheet for more general partial updates
    const result = await updateOrderStatus(params.orderNumber, status);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Failed to update order status' },
        { status: 404 } // Or 500 if it's a server error during update
      );
    }
    const updatedOrder = await getOrderByOrderNumber(params.orderNumber);
    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error(`[API Order Admin PATCH] Error updating status for order ${params.orderNumber}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to update order status', details: errorMessage },
      { status: 500 }
    );
  }
}