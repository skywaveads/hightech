export interface OrderItem {
  productId: string;
  productName: string;
  productNameEn: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  dialCode: string;
  city: string;
  address: string;
  postalCode?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderFormData extends CustomerInfo {
  // يمكن إضافة حقول إضافية للفورم هنا إذا لزم الأمر
}