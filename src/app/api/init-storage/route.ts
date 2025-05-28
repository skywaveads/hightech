import { NextRequest, NextResponse } from 'next/server';
import { LocalCommentStorage } from '@/lib/local-storage';

export async function POST(request: NextRequest) {
  try {
    console.log('[Init Storage API] Initializing local storage with sample data...');
    
    await LocalCommentStorage.initializeWithSampleData();
    
    console.log('[Init Storage API] Local storage initialized successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Local storage initialized with sample data'
    });

  } catch (error) {
    console.error('[Init Storage API] Error initializing storage:', error);
    return NextResponse.json(
      { error: 'Failed to initialize storage' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('[Init Storage API] Getting storage status...');
    
    // Try to get comments to check if storage is working
    const result = await LocalCommentStorage.getCommentsByProductId('high-tech-cutter-plotter', 1, 10);
    
    return NextResponse.json({
      success: true,
      message: 'Local storage is working',
      commentsCount: result.total,
      sampleComments: result.comments.slice(0, 3)
    });

  } catch (error) {
    console.error('[Init Storage API] Error checking storage:', error);
    return NextResponse.json(
      { error: 'Storage check failed' },
      { status: 500 }
    );
  }
}