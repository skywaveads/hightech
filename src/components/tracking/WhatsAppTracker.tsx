'use client';

import { trackContact } from '@/lib/facebook-conversions';

interface WhatsAppTrackerProps {
  children: React.ReactNode;
  contentName?: string;
  className?: string;
  href: string;
}

export default function WhatsAppTracker({ 
  children, 
  contentName = 'WhatsApp Contact',
  className = '',
  href 
}: WhatsAppTrackerProps) {
  
  const handleWhatsAppClick = async () => {
    try {
      // تتبع حدث التواصل عبر الواتساب
      await trackContact({
        method: 'whatsapp',
        contentName,
      });
    } catch (error) {
      console.error('Error tracking WhatsApp contact:', error);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleWhatsAppClick}
    >
      {children}
    </a>
  );
}