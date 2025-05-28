"use client";

import React, { useState, FormEvent } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // In a real app, you'd send this to an API endpoint
    // This is a mockup to show the UI states
    try {
      // Simulating API call
      await new Promise(r => setTimeout(r, 1000));
      
      // For demo purposes, just validate email format
      if (!email.includes('@')) {
        throw new Error('البريد الإلكتروني غير صالح');
      }
      
      setIsSuccess(true);
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          <p className="font-medium text-center">تم الاشتراك بنجاح! شكراً لك.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              required
              dir="rtl"
              disabled={isSubmitting}
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm mb-3">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الاشتراك...' : 'اشترك الآن'}
          </button>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            لن نشارك بريدك الإلكتروني مع أي جهة خارجية
          </p>
        </form>
      )}
    </div>
  );
} 