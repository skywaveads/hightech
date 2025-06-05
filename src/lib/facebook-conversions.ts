// Facebook Conversions API Configuration
const FACEBOOK_ACCESS_TOKEN = 'EAARseZCFegbQBO40DineHSHock1ZBYcZADoBlXrSuSPtomZAaGh9N8hjDIneGDbtm5MAMUWJWDtPLoklk2SURa5v82RSpAi9XWZAl4ZA1iJKSJYU3Ncfm2WXpB7pji5UKsHYocSPpRQSn2x51HMuW2nj3BUVIChPyBlXX1P6OYj2WPfuqlYklz7POrj62j7Ni9zAZDZD';
const FACEBOOK_PIXEL_ID = '1227908358974591';
const API_VERSION = 'v18.0';

interface FacebookEvent {
  event_name: string;
  event_time: number;
  action_source: 'website';
  event_source_url?: string;
  user_data: {
    em?: string[];
    ph?: string[];
    fn?: string[];
    ln?: string[];
    ct?: string[];
    st?: string[];
    country?: string[];
    client_user_agent?: string;
  };
  custom_data?: {
    currency?: string;
    value?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    contents?: Array<{
      id: string;
      quantity: number;
      item_price: number;
    }>;
    num_items?: number;
    search_string?: string;
  };
  event_id?: string;
}

// Hash function for user data (simple implementation)
function hashData(data: string): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    // Use Web Crypto API if available
    return data.toLowerCase().trim();
  }
  return data.toLowerCase().trim();
}

// Generate unique event ID
function generateEventId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Get user data from browser
function getUserData(): FacebookEvent['user_data'] {
  if (typeof window === 'undefined') {
    return {
      client_user_agent: 'server-side',
    };
  }
  
  return {
    client_user_agent: navigator.userAgent,
  };
}

// Send event to Facebook Conversions API
async function sendToConversionsAPI(events: FacebookEvent[]): Promise<void> {
  try {
    const response = await fetch(`https://graph.facebook.com/${API_VERSION}/${FACEBOOK_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: events,
        access_token: FACEBOOK_ACCESS_TOKEN,
      }),
    });

    if (!response.ok) {
      console.error('Facebook Conversions API error:', await response.text());
    }
  } catch (error) {
    console.error('Error sending to Facebook Conversions API:', error);
  }
}

// Track Purchase Event
export async function trackPurchase(orderData: {
  value: number;
  currency: string;
  orderId: string;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  userEmail?: string;
  userPhone?: string;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: {
      ...getUserData(),
      ...(orderData.userEmail && { em: [hashData(orderData.userEmail)] }),
      ...(orderData.userPhone && { ph: [hashData(orderData.userPhone)] }),
    },
    custom_data: {
      currency: orderData.currency,
      value: orderData.value.toString(),
      ...(orderData.items && {
        contents: orderData.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          item_price: item.price,
        })),
        num_items: orderData.items.length,
      }),
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: orderData.value,
      currency: orderData.currency,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}

// Track View Content Event
export async function trackViewContent(contentData: {
  contentName: string;
  contentCategory?: string;
  contentId?: string;
  value?: number;
  currency?: string;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: getUserData(),
    custom_data: {
      content_name: contentData.contentName,
      ...(contentData.contentCategory && { content_category: contentData.contentCategory }),
      ...(contentData.contentId && { content_ids: [contentData.contentId] }),
      ...(contentData.value && { value: contentData.value.toString() }),
      ...(contentData.currency && { currency: contentData.currency }),
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: contentData.contentName,
      content_category: contentData.contentCategory,
      content_ids: contentData.contentId ? [contentData.contentId] : undefined,
      value: contentData.value,
      currency: contentData.currency,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}

// Track Add to Cart Event
export async function trackAddToCart(cartData: {
  contentName: string;
  contentId: string;
  value: number;
  currency: string;
  quantity?: number;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'AddToCart',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: getUserData(),
    custom_data: {
      content_name: cartData.contentName,
      content_ids: [cartData.contentId],
      value: cartData.value.toString(),
      currency: cartData.currency,
      contents: [{
        id: cartData.contentId,
        quantity: cartData.quantity || 1,
        item_price: cartData.value,
      }],
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      content_name: cartData.contentName,
      content_ids: [cartData.contentId],
      value: cartData.value,
      currency: cartData.currency,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}

// Track Contact Event
export async function trackContact(contactData: {
  method: 'whatsapp' | 'email' | 'phone' | 'form';
  contentName?: string;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'Contact',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: getUserData(),
    custom_data: {
      ...(contactData.contentName && { content_name: contactData.contentName }),
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact', {
      content_name: contactData.contentName,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}

// Track Search Event
export async function trackSearch(searchData: {
  searchString: string;
  contentCategory?: string;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'Search',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: getUserData(),
    custom_data: {
      search_string: searchData.searchString,
      ...(searchData.contentCategory && { content_category: searchData.contentCategory }),
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Search', {
      search_string: searchData.searchString,
      content_category: searchData.contentCategory,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}

// Track Initiate Checkout Event
export async function trackInitiateCheckout(checkoutData: {
  value: number;
  currency: string;
  numItems: number;
  contents?: Array<{
    id: string;
    quantity: number;
    item_price: number;
  }>;
}): Promise<void> {
  const event: FacebookEvent = {
    event_name: 'InitiateCheckout',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    event_id: generateEventId(),
    user_data: getUserData(),
    custom_data: {
      value: checkoutData.value.toString(),
      currency: checkoutData.currency,
      num_items: checkoutData.numItems,
      ...(checkoutData.contents && { contents: checkoutData.contents }),
    },
  };

  // Send to both Pixel and Conversions API
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value: checkoutData.value,
      currency: checkoutData.currency,
      num_items: checkoutData.numItems,
    }, { eventID: event.event_id });
  }

  await sendToConversionsAPI([event]);
}