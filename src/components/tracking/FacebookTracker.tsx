'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/facebook-conversions';

interface FacebookTrackerProps {
  contentName: string;
  contentCategory?: string;
  contentId?: string;
  value?: number;
  currency?: string;
}

export default function FacebookTracker({
  contentName,
  contentCategory,
  contentId,
  value,
  currency = 'EGP'
}: FacebookTrackerProps) {
  useEffect(() => {
    // تتبع عرض المحتوى عند تحميل الصفحة
    const trackContent = async () => {
      try {
        const trackingData: any = {
          contentName,
          currency,
        };
        
        if (contentCategory) trackingData.contentCategory = contentCategory;
        if (contentId) trackingData.contentId = contentId;
        if (value) trackingData.value = value;
        
        await trackViewContent(trackingData);
      } catch (error) {
        console.error('Error tracking view content:', error);
      }
    };

    trackContent();
  }, [contentName, contentCategory, contentId, value, currency]);

  return null; // هذا المكون لا يعرض أي شيء
}