import { NextRequest, NextResponse } from 'next/server';
import { CommentDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('[Init DB API] Initializing database with sample data...');
    
    // Initialize database indexes
    await CommentDatabase.initializeIndexes();
    console.log('[Init DB API] Database indexes created successfully');
    
    // Add sample comments
    const sampleComments = [
      {
        productId: 'high-tech-cutter-plotter',
        userName: 'أحمد محمد',
        userEmail: 'ahmed@example.com',
        rating: 5,
        comment: 'منتج ممتاز جداً! جودة القطع عالية والدقة مذهلة. أنصح به بشدة لأي شخص يعمل في مجال الطباعة والتصميم.',
        verified: true,
        helpful: { count: 12, users: ['user1', 'user2', 'user3'] },
        status: 'active' as const
      },
      {
        productId: 'high-tech-cutter-plotter',
        userName: 'فاطمة علي',
        userEmail: 'fatima@example.com',
        rating: 4,
        comment: 'جهاز رائع وسهل الاستخدام. الوحيد العيب أن الصوت مرتفع قليلاً أثناء العمل، لكن النتائج ممتازة.',
        verified: false,
        helpful: { count: 8, users: ['user4', 'user5'] },
        status: 'active' as const
      },
      {
        productId: 'high-tech-cutter-plotter',
        userName: 'محمد السعيد',
        userEmail: 'mohamed@example.com',
        rating: 5,
        comment: 'استخدمه في مشروعي التجاري منذ 6 أشهر. موثوق جداً ولم يتعطل أبداً. خدمة العملاء ممتازة أيضاً.',
        verified: true,
        helpful: { count: 15, users: ['user6', 'user7', 'user8', 'user9'] },
        status: 'active' as const
      }
    ];

    // Check if comments already exist
    const existingComments = await CommentDatabase.getCommentsByProductId('high-tech-cutter-plotter', 1, 10);
    
    if (existingComments.total === 0) {
      console.log('[Init DB API] Adding sample comments...');
      
      for (const commentData of sampleComments) {
        await CommentDatabase.addComment(commentData);
        console.log(`[Init DB API] Added comment by ${commentData.userName}`);
      }
      
      console.log('[Init DB API] Sample data added successfully');
    } else {
      console.log(`[Init DB API] Found ${existingComments.total} existing comments, skipping sample data`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      commentsCount: existingComments.total || sampleComments.length
    });

  } catch (error) {
    console.error('[Init DB API] Error initializing database:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('[Init DB API] Checking database status...');
    
    // Try to get comments to check if database is working
    const result = await CommentDatabase.getCommentsByProductId('high-tech-cutter-plotter', 1, 10);
    
    return NextResponse.json({
      success: true,
      message: 'Database is working',
      commentsCount: result.total,
      sampleComments: result.comments.slice(0, 3)
    });

  } catch (error) {
    console.error('[Init DB API] Error checking database:', error);
    return NextResponse.json(
      { 
        error: 'Database check failed',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
}