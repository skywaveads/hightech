import { trackPurchase, trackInitiateCheckout } from './facebook-conversions';
import { CartItem } from '@/contexts/CartContext';

export interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  currency: string;
  customerEmail?: string;
  customerPhone?: string;
}

// تتبع بدء عملية الشراء
export async function trackCheckoutInitiation(cartItems: CartItem[]): Promise<void> {
  try {
    const total = cartItems.reduce((sum, item) => 
      sum + (item.product.sale_price || item.product.price) * item.quantity, 0
    );
    
    const contents = cartItems.map(item => ({
      id: item.product._id,
      quantity: item.quantity,
      item_price: item.product.sale_price || item.product.price,
    }));

    await trackInitiateCheckout({
      value: total,
      currency: 'EGP',
      numItems: cartItems.length,
      contents,
    });
  } catch (error) {
    console.error('Error tracking checkout initiation:', error);
  }
}

// تتبع إتمام الشراء
export async function trackOrderCompletion(orderData: OrderData): Promise<void> {
  try {
    const items = orderData.items.map(item => ({
      id: item.product._id,
      name: item.product.name_ar,
      quantity: item.quantity,
      price: item.product.sale_price || item.product.price,
    }));

    const purchaseData: any = {
      value: orderData.total,
      currency: orderData.currency,
      orderId: orderData.orderId,
      items,
    };
    
    if (orderData.customerEmail) {
      purchaseData.userEmail = orderData.customerEmail;
    }
    
    if (orderData.customerPhone) {
      purchaseData.userPhone = orderData.customerPhone;
    }

    await trackPurchase(purchaseData);
  } catch (error) {
    console.error('Error tracking order completion:', error);
  }
}