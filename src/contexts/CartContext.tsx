'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/types/product';
import { cartStorage } from '@/lib/cart-storage';

// أنواع البيانات
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getStorageInfo: () => any;
}

// الحالة الأولية
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// مُخفض الحالة (Reducer)
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product._id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // إذا كان المنتج موجود، زيادة الكمية
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // إضافة منتج جديد
        const newItem: CartItem = {
          id: product._id,
          product,
          quantity,
          addedAt: new Date(),
        };
        newItems = [...state.items, newItem];
      }
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    case 'LOAD_CART': {
      const items = action.payload;
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...state,
        items,
        totalItems,
        totalPrice,
      };
    }
    
    default:
      return state;
  }
}

// إنشاء Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// مزود السياق (Provider)
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // تحميل السلة من التخزين عند بدء التطبيق
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const cartData = cartStorage.load();
        
        if (cartData && Array.isArray(cartData) && cartData.length > 0) {
          // تحويل التواريخ من string إلى Date
          const itemsWithDates = cartData.map(item => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          dispatch({ type: 'LOAD_CART', payload: itemsWithDates });
        }
      } catch (error) {
        console.error('خطأ في تحميل السلة من التخزين:', error);
        cartStorage.clear();
      }
    };

    loadCartFromStorage();
  }, []);

  // حفظ السلة في التخزين عند تغيير الحالة
  useEffect(() => {
    if (state.items.length > 0) {
      cartStorage.save(state.items);
    } else {
      cartStorage.clear();
    }
  }, [state.items]);

  // الوظائف
  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getTotalPrice = () => {
    return state.totalPrice;
  };

  const getStorageInfo = () => {
    return cartStorage.getStorageInfo();
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalPrice,
    getStorageInfo,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook لاستخدام السياق
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Hook للحصول على عدد العناصر فقط (للأداء)
export function useCartCount() {
  const { totalItems } = useCart();
  return totalItems;
}

// Hook للحصول على السعر الإجمالي فقط
export function useCartTotal() {
  const { totalPrice } = useCart();
  return totalPrice;
}

// Hook للحصول على معلومات التخزين (للتطوير والتشخيص)
export function useCartStorageInfo() {
  const { getStorageInfo } = useCart();
  return getStorageInfo();
}