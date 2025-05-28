import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Updated route segment config for Next.js App Router
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Please upload an image (JPEG, PNG, WebP)' },
        { status: 400 }
      );
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }
    
    // Get file extension and create a unique filename
    const fileExtension = file.name.split('.').pop() || '';
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Convert File to ArrayBuffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Save to public/uploads folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);
    
    await writeFile(filePath, buffer);
    
    // Return the URL path that can be used in <img> tags
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName
    });
    
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
} 