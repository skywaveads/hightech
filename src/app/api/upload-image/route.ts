import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToDrive } from '@/lib/google-products';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = `product_${timestamp}_${randomString}.${extension}`;

    // Upload to Google Drive
    const imageUrl = await uploadImageToDrive(buffer, fileName, file.type);

    return NextResponse.json({
      success: true,
      url: imageUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to upload image';
    if (error instanceof Error) {
      if (error.message.includes('permission')) {
        errorMessage = 'Permission denied. Please check Google Drive folder permissions.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'Storage quota exceeded. Please free up space in Google Drive.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = `Upload failed: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}