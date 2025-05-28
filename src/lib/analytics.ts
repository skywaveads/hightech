// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Google Tag Manager Configuration
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// E-commerce tracking
export const purchase = ({
  transaction_id,
  value,
  currency = 'EGP',
  items,
}: {
  transaction_id: string
  value: number
  currency?: string
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id,
      value,
      currency,
      items,
    })
  }
}

// Add to cart tracking
export const addToCart = ({
  currency = 'EGP',
  value,
  items,
}: {
  currency?: string
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency,
      value,
      items,
    })
  }
}

// View item tracking
export const viewItem = ({
  currency = 'EGP',
  value,
  items,
}: {
  currency?: string
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    price: number
  }>
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency,
      value,
      items,
    })
  }
}

// Search tracking
export const search = (search_term: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term,
    })
  }
}

// Contact form submission tracking
export const contactFormSubmit = (form_type: string) => {
  event({
    action: 'form_submit',
    category: 'contact',
    label: form_type,
  })
}

// Newsletter signup tracking
export const newsletterSignup = () => {
  event({
    action: 'newsletter_signup',
    category: 'engagement',
    label: 'footer_newsletter',
  })
}

// Phone call tracking
export const phoneCall = (phone_number: string) => {
  event({
    action: 'phone_call',
    category: 'contact',
    label: phone_number,
  })
}

// WhatsApp click tracking
export const whatsappClick = () => {
  event({
    action: 'whatsapp_click',
    category: 'contact',
    label: 'floating_button',
  })
}

// Social media click tracking
export const socialMediaClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'engagement',
    label: platform,
  })
}

// Blog post read tracking
export const blogPostRead = (post_title: string, reading_time: number) => {
  event({
    action: 'blog_read',
    category: 'content',
    label: post_title,
    value: reading_time,
  })
}

// Video play tracking
export const videoPlay = (video_title: string) => {
  event({
    action: 'video_play',
    category: 'engagement',
    label: video_title,
  })
}

// Download tracking
export const downloadFile = (file_name: string, file_type: string) => {
  event({
    action: 'file_download',
    category: 'engagement',
    label: `${file_name}.${file_type}`,
  })
}

// Scroll depth tracking
export const scrollDepth = (depth: number) => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  })
}

// Page timing tracking
export const pageLoadTime = (load_time: number) => {
  event({
    action: 'page_load_time',
    category: 'performance',
    value: load_time,
  })
}

// Error tracking
export const trackError = (error_message: string, error_location: string) => {
  event({
    action: 'javascript_error',
    category: 'error',
    label: `${error_location}: ${error_message}`,
  })
}

// User engagement tracking
export const userEngagement = (engagement_time: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      engagement_time_msec: engagement_time,
    })
  }
}

// Custom dimensions
export const setCustomDimension = (dimension: string, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: { [dimension]: value },
    })
  }
}

// User properties
export const setUserProperty = (property: string, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', { [property]: value })
  }
}

// Consent management
export const grantConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    })
  }
}

export const denyConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    })
  }
}

// Initialize consent
export const initConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      wait_for_update: 500,
    })
  }
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}