import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsDatabase } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';

// GET - جلب جميع التعليقات للإدارة
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';
    const sortBy = (searchParams.get('sortBy') || 'newest') as 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating' | 'most_helpful';

    const result = await GoogleSheetsDatabase.getAllComments(page, limit, sortBy);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting all comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - عمليات جماعية على التعليقات
export async function POST(request: NextRequest) {
  try {
    const { action, commentIds, updateData } = await request.json();

    if (!action || !commentIds || !Array.isArray(commentIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: action, commentIds' },
        { status: 400 }
      );
    }

    let result;
    
    switch (action) {
      case 'bulk-delete':
        result = await GoogleSheetsDatabase.bulkDeleteComments(commentIds);
        return NextResponse.json({ 
          success: true, 
          deletedCount: result,
          message: `تم حذف ${result} تعليق بنجاح` 
        });

      case 'bulk-approve':
        result = await GoogleSheetsDatabase.bulkUpdateComments(commentIds, { status: 'active' });
        return NextResponse.json({ 
          success: true, 
          updatedCount: result,
          message: `تم اعتماد ${result} تعليق بنجاح` 
        });

      case 'bulk-reject':
        result = await GoogleSheetsDatabase.bulkUpdateComments(commentIds, { status: 'hidden' });
        return NextResponse.json({ 
          success: true, 
          updatedCount: result,
          message: `تم رفض ${result} تعليق بنجاح` 
        });

      case 'bulk-update':
        if (!updateData) {
          return NextResponse.json(
            { error: 'Missing updateData for bulk-update action' },
            { status: 400 }
          );
        }
        result = await GoogleSheetsDatabase.bulkUpdateComments(commentIds, updateData);
        return NextResponse.json({ 
          success: true, 
          updatedCount: result,
          message: `تم تحديث ${result} تعليق بنجاح` 
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in bulk comment operation:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}