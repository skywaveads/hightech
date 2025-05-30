import { NextRequest, NextResponse } from 'next/server';
import { CommentDatabase } from '@/lib/database';
// import { CommentService } from '@/lib/models/Comment'; // Unused import

// GET - Fetch comments for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = (searchParams.get('sort') || 'newest') as 'newest' | 'oldest' | 'helpful';
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    console.log(`[Comments API] Fetching comments for product: ${productId}`);
    console.log(`[Comments API] Query params - page: ${page}, limit: ${limit}, sort: ${sort}`);
    
    const result = await CommentDatabase.getCommentsByProductId(productId, page, limit, sort);
    
    console.log(`[Comments API] Found ${result.comments.length} comments out of ${result.total} total`);
    
    return NextResponse.json({
      success: true,
      comments: result.comments,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit)
    });

  } catch (error) {
    console.error('[Comments API] Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const body = await request.json();
    
    console.log(`[Comments API] Adding comment for product: ${productId}`);
    console.log('[Comments API] Request body:', body);

    // Validate required fields
    if (!body.name || !body.email || !body.comment) {
      console.log('[Comments API] Validation failed - missing required fields');
      console.log('[Comments API] Received data:', {
        name: body.name,
        email: body.email,
        comment: body.comment
      });
      return NextResponse.json(
        { error: 'Name, email, and comment are required' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (body.comment.trim().length < 10) {
      return NextResponse.json(
        { error: 'Comment must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create comment object
    const commentData = {
      productId,
      userName: body.name.trim(),
      userEmail: body.email.trim().toLowerCase(),
      comment: body.comment.trim(),
      rating: Math.max(1, Math.min(5, parseInt(body.rating || body.stars) || 5)), // Ensure rating is between 1-5
      title: body.title ? body.title.trim() : undefined,
      pros: body.pros && Array.isArray(body.pros) ? body.pros.filter((p: string) => p.trim()).map((p: string) => p.trim()) : undefined,
      cons: body.cons && Array.isArray(body.cons) ? body.cons.filter((c: string) => c.trim()).map((c: string) => c.trim()) : undefined,
      status: 'pending' as const, // Require admin approval
      verified: false,
      helpful: {
        count: 0,
        users: []
      }
    };

    console.log('[Comments API] Creating comment with data:', commentData);

    console.log('[Comments API] Calling CommentDatabase.addComment...');
    const newComment = await CommentDatabase.addComment(commentData);
    console.log('[Comments API] Comment added successfully:', newComment._id);
    
    return NextResponse.json({
      success: true,
      comment: newComment,
      message: 'تم ارسال التعليق للمراجعة'
    }, { status: 201 });

  } catch (error) {
    console.error('[Comments API] Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}