import { NextRequest, NextResponse } from 'next/server';
import { CommentDatabase } from '@/lib/database';

// POST - Toggle helpful status for a comment
export async function POST(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { commentId } = params;
    const body = await request.json();
    
    console.log(`[Helpful API] Processing helpful request for comment: ${commentId}`);
    console.log('[Helpful API] Request body:', body);
    
    // For demo purposes, generate a random user ID
    // In a real app, this would come from authentication
    const userId = body.userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const isHelpful = body.isHelpful !== false; // Default to true

    // Validate comment ID
    if (!commentId || commentId.length < 5) {
      console.log('[Helpful API] Invalid comment ID:', commentId);
      return NextResponse.json(
        { error: 'Invalid comment ID' },
        { status: 400 }
      );
    }

    console.log(`[Helpful API] User ${userId} marking comment ${commentId} as ${isHelpful ? 'helpful' : 'not helpful'}`);

    // Check if comment exists
    const comment = await CommentDatabase.getCommentById(commentId);
    if (!comment) {
      console.log('[Helpful API] Comment not found:', commentId);
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Update helpful count
    const success = await CommentDatabase.updateHelpfulCount(commentId, userId, isHelpful);

    if (!success) {
      console.log('[Helpful API] Failed to update helpful count');
      return NextResponse.json(
        { error: 'Failed to update helpful status' },
        { status: 500 }
      );
    }

    // Get updated comment to return new helpful count
    const updatedComment = await CommentDatabase.getCommentById(commentId);
    const newHelpfulCount = updatedComment?.helpful?.count || 0;

    console.log(`[Helpful API] Successfully updated helpful count to: ${newHelpfulCount}`);

    return NextResponse.json({
      success: true,
      message: isHelpful ? 'Comment marked as helpful' : 'Helpful mark removed',
      helpfulCount: newHelpfulCount
    });

  } catch (error) {
    console.error('[Helpful API] Error updating helpful status:', error);
    return NextResponse.json(
      { error: 'Failed to update helpful status' },
      { status: 500 }
    );
  }
}

// GET - Get helpful count for a comment
export async function GET(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { commentId } = params;
    
    console.log(`[Helpful API] Getting helpful count for comment: ${commentId}`);

    // Validate comment ID
    if (!commentId || commentId.length < 5) {
      return NextResponse.json(
        { error: 'Invalid comment ID' },
        { status: 400 }
      );
    }

    // Get comment
    const comment = await CommentDatabase.getCommentById(commentId);
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    console.log(`[Helpful API] Comment helpful count: ${comment.helpful?.count || 0}`);

    return NextResponse.json({
      success: true,
      commentId,
      helpfulCount: comment.helpful?.count || 0
    });

  } catch (error) {
    console.error('[Helpful API] Error getting helpful count:', error);
    return NextResponse.json(
      { error: 'Failed to get helpful count' },
      { status: 500 }
    );
  }
}