'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart, ArrowLeft, Edit, Trash2, Eye, Filter, Search,
  RefreshCw, Plus, CheckCircle, XCircle, AlertTriangle, MoreHorizontal,
  ChevronDown, ChevronUp, Package, User, CalendarDays, Tag, ListFilter, Settings2, Clock,
  LayoutDashboard, MessageSquare
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import { Order, OrderItem, CustomerInfo } from '@/types/order'; // Using existing Order types

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};


interface AdminOrder extends Order {
  // Add any admin-specific display fields if needed
  customerName?: string;
  totalItems?: number;
}

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusMap: Record<Order['status'], { text: string; color: string; icon?: React.ReactNode }> = {
    pending: { text: 'في الانتظار', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: <Clock size={14} /> },
    confirmed: { text: 'مؤكد', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: <CheckCircle size={14} /> },
    processing: { text: 'قيد التجهيز', color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: <Settings2 size={14} /> },
    shipped: { text: 'تم الشحن', color: 'bg-cyan-100 text-cyan-800 border-cyan-300', icon: <Package size={14} /> },
    delivered: { text: 'تم التوصيل', color: 'bg-green-100 text-green-800 border-green-300', icon: <CheckCircle size={14} /> },
    cancelled: { text: 'ملغي', color: 'bg-red-100 text-red-800 border-red-300', icon: <XCircle size={14} /> },
  };
  const currentStatus = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800 border-gray-300' };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1 border ${currentStatus.color}`}>
      {currentStatus.icon}
      {currentStatus.text}
    </span>
  );
};

const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'warning' | 'info'; onClose: () => void }) => {
  // Basic Toast implementation (can be enhanced)
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${getToastStyles()}`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">X</button>
    </div>
  );
};


export default function OrdersAdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<{ id: string; email: string; role: string; loginTime?: number } | null>(null);


  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type });
  };

  // Auth check effect
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success && responseData.user) {
            setAdminData({
              ...responseData.user,
              loginTime: responseData.user.loginTime || Date.now()
            });
            setIsAuthenticated(true);
          } else {
            console.error('Authentication check successful, but user data is invalid:', responseData.message);
            showToast(responseData.message || 'بيانات المصادقة غير صالحة', 'error');
            router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname) + '&error=auth_data_invalid');
          }
        } else {
          router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        showToast('فشل في التحقق من الهوية', 'error');
        router.push('/admin-login');
      }
    }
    
    checkAuth();
  }, [router]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Add query params for server-side filtering/pagination later
      const response = await fetch(`/api/orders/admin`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch orders');
      }
      const data = await response.json();
      const transformedOrders: AdminOrder[] = data.orders.map((order: Order) => ({
        ...order,
        customerName: `${order.customer.firstName} ${order.customer.lastName}`,
        totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0),
      }));
      setOrders(transformedOrders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      showToast(`خطأ في جلب الطلبات: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  }, []); // Add dependencies if using query params from state

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      // router.push('/admin-login'); // Uncomment for real auth
    }
  }, [isAuthenticated, fetchOrders, router]);

  const handleUpdateStatus = async (orderNumber: string, status: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/admin/${orderNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update order status');
      }
      showToast('تم تحديث حالة الطلب بنجاح', 'success');
      fetchOrders(); // Refresh orders
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      showToast(`خطأ في تحديث حالة الطلب: ${errorMessage}`, 'error');
    }
  };
  
  const handleDeleteOrder = async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders/admin/${orderNumber}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
         const errData = await response.json();
        throw new Error(errData.error || 'Failed to delete order');
      }
      showToast('تم حذف الطلب بنجاح', 'success');
      fetchOrders(); // Refresh orders
      setIsDeleteModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      showToast(`خطأ في حذف الطلب: ${errorMessage}`, 'error');
    }
  };

  const openEditModal = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const openDeleteConfirmModal = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };
  
  // Client-side filtering for now
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const statusMatch = filterStatus === 'all' || order.status === filterStatus;
    const searchMatch = 
      order.orderNumber.toLowerCase().includes(searchLower) ||
      (order.customerName || '').toLowerCase().includes(searchLower) ||
      order.customer.email.toLowerCase().includes(searchLower) ||
      order.customer.phone.toLowerCase().includes(searchLower);
    return statusMatch && searchMatch;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);


  if (!isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">جاري التحقق من الهوية...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader adminData={adminData || undefined} onLogout={() => router.push('/admin-login')} />
      <main className="container mx-auto px-4 py-8 pt-24 lg:pt-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/products-admin" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <LayoutDashboard size={18} /> {/* Changed Icon */}
              <span>لوحة التحكم الرئيسية</span> {/* Changed Text */}
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
             <Link href="/comments-admin" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <MessageSquare size={18} />
              <span>إدارة التعليقات</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart size={28} className="text-blue-600" />
              إدارة الطلبات
            </h1>
          </div>
          {/* <button
            onClick={() => { alert("Add new order functionality to be implemented"); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            إضافة طلب جديد
          </button> */}
        </div>

        {/* Filters and Search */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">بحث</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="بحث برقم الطلب, اسم العميل, الايميل..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">فلترة بالحالة</label>
              <select
                id="statusFilter"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="processing">قيد التجهيز</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التوصيل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchOrders}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-colors w-full md:w-auto"
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                {loading ? 'جاري التحديث...' : 'تحديث الطلبات'}
              </button>
            </div>
          </div>
        </div>

        {loading && <div className="text-center py-10"><RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" /> <p>جاري تحميل الطلبات...</p></div>}
        {error && <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-md"><AlertTriangle className="mx-auto h-8 w-8 mb-2" /> {error}</div>}
        
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline">
                      <button onClick={() => openEditModal(order)}>{order.orderNumber}</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{order.total.toLocaleString()} ج.م</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(order)} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded-md transition-colors" title="تعديل/عرض التفاصيل">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => openDeleteConfirmModal(order)} className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded-md transition-colors" title="حذف الطلب">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      <Package size={48} className="mx-auto mb-2 text-gray-400" />
                      لا توجد طلبات تطابق معايير البحث الحالية.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              السابق
            </button>
            <span className="text-sm text-gray-700">
              صفحة {currentPage} من {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        )}

        {/* Edit Order Modal */}
        {isEditModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">تفاصيل الطلب #{selectedOrder.orderNumber}</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={24} />
                </button>
              </div>
              
              {/* Order Details Form - Simplified for now, can be expanded */}
              <div className="space-y-4">
                <div><strong>العميل:</strong> {selectedOrder.customerName} ({selectedOrder.customer.email})</div>
                <div><strong>الهاتف:</strong> {selectedOrder.customer.phone}</div>
                <div><strong>العنوان:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.country}</div>
                <div><strong>تاريخ الطلب:</strong> {new Date(selectedOrder.createdAt).toLocaleString('ar-EG')}</div>
                <div><strong>الإجمالي:</strong> {selectedOrder.total.toLocaleString()} ج.م</div>
                
                <div className="mt-4">
                  <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700 mb-1">تغيير حالة الطلب:</label>
                  <select
                    id="orderStatus"
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Order['status'];
                      setSelectedOrder(prev => prev ? {...prev, status: newStatus} : null);
                      handleUpdateStatus(selectedOrder.orderNumber, newStatus);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">في الانتظار</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="processing">قيد التجهيز</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">تم التوصيل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>

                <h4 className="font-semibold mt-4 pt-4 border-t">المنتجات:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {selectedOrder.items.map(item => (
                    <li key={item.productId}>{item.productName} (الكمية: {item.quantity}, السعر: {item.price} ج.م)</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  إغلاق
                </button>
                {/* <button 
                  onClick={() => { /* Handle full order update if needed */ /* setIsEditModalOpen(false); showToast('تم حفظ التعديلات (مثال)', 'success'); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  حفظ التعديلات
                </button> */}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">تأكيد الحذف</h2>
              <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد حذف الطلب رقم <span className="font-semibold">{selectedOrder.orderNumber}</span>؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => handleDeleteOrder(selectedOrder.orderNumber)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  حذف الطلب
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </main>
    </div>
  );
}