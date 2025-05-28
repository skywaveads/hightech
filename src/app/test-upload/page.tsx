'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      console.log('Upload response:', data);
      setUploadedImage(data.url);
      
    } catch (err: any) {
      console.error('Error during upload:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">اختبار رفع الصور</h1>
      
      <form onSubmit={handleUpload} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">اختر صورة</label>
          <input 
            type="file" 
            onChange={handleFileChange}
            accept="image/*"
            className="border rounded-lg p-2 w-full"
          />
        </div>
        
        {preview && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">معاينة</h2>
            <div className="relative h-48 w-48 border rounded">
              <Image 
                src={preview} 
                alt="Preview" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          disabled={!file || loading}
        >
          {loading ? 'جاري الرفع...' : 'رفع الصورة'}
        </button>
      </form>
      
      {uploadedImage && (
        <div>
          <h2 className="text-lg font-semibold mb-2">الصورة المرفوعة</h2>
          <div className="relative h-64 w-64 border rounded">
            <Image 
              src={uploadedImage} 
              alt="Uploaded Image" 
              fill 
              className="object-contain" 
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            رابط الصورة: <code className="bg-gray-100 p-1 rounded">{uploadedImage}</code>
          </p>
        </div>
      )}
    </div>
  );
} 