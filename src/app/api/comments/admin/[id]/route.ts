import { NextRequest, NextResponse } from 'next/server';
import { GoogleSheetsDatabase } from '@/lib/google-sheets';
import { verifyAdmin, AdminUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET - جلب تعليق محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminUser: AdminUser | null = await verifyAdmin(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const comment = await GoogleSheetsDatabase.getCommentById(params.id);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(comment);
  } catch (error) {
    console.error(`Error getting comment ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch comment' },
      { status: 500 }
    );
  }
}

// PUT - تحديث تعليق
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminUser: AdminUser | null = await verifyAdmin(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updateData = await request.json();
    const success = await GoogleSheetsDatabase.updateComment(params.id, updateData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // جلب التعليق المحدث
    const updatedComment = await GoogleSheetsDatabase.getCommentById(params.id);
    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error(`Error updating comment ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE - حذف تعليق
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminUser: AdminUser | null = await verifyAdmin(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const success = await GoogleSheetsDatabase.deleteComment(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(`Error deleting comment ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// PATCH - تحديث جزئي للتعليق (مثل تغيير الحالة)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminUser: AdminUser | null = await verifyAdmin(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, ...updateData } = await request.json();
    
    if (action === 'toggle-status') {
      // تغيير حالة التعليق بين active/hidden
      const comment = await GoogleSheetsDatabase.getCommentById(params.id);
      if (!comment) {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        );
      }
      
      const newStatus = comment.status === 'active' ? 'hidden' : 'active';
      const success = await GoogleSheetsDatabase.updateComment(params.id, { status: newStatus });
      
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to update comment status' },
          { status: 500 }
        );
      }
      
      const updatedComment = await GoogleSheetsDatabase.getCommentById(params.id);
      return NextResponse.json(updatedComment);
    }
    
    if (action === 'approve') {
      const success = await GoogleSheetsDatabase.updateComment(params.id, { status: 'active' });
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to approve comment' },
          { status: 500 }
        );
      }
      
      const updatedComment = await GoogleSheetsDatabase.getCommentById(params.id);
      return NextResponse.json(updatedComment);
    }
    
    if (action === 'reject') {
      const success = await GoogleSheetsDatabase.updateComment(params.id, { status: 'hidden' });
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to reject comment' },
          { status: 500 }
        );
      }
      
      const updatedComment = await GoogleSheetsDatabase.getCommentById(params.id);
      return NextResponse.json(updatedComment);
    }
    
    // تحديث عام
    const success = await GoogleSheetsDatabase.updateComment(params.id, updateData);
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    const updatedComment = await GoogleSheetsDatabase.getCommentById(params.id);
    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error(`Error patching comment ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}