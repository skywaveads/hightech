'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown, ChevronUp, Search, Plus, Edit, Trash2, MoreHorizontal,
  Check, X, Upload, RefreshCw, Eye, EyeOff, Filter, LogOut, Download,
  BarChart3, TrendingUp, Package, DollarSign, AlertTriangle, Star,
  Calendar, Clock, Users, ShoppingCart, Zap, Shield, Activity,
  Grid3X3, List, SortAsc, SortDesc, FileText, Settings, Bell, MessageSquare
} from 'lucide-react';
import { Product } from '@/types/product';
import ProductForm from '@/components/admin/ProductForm';
import AdminHeader from '@/components/AdminHeader';

// مكونات واجهة المستخدم المحسنة
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'warning' | 'info'; onClose: () => void }) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5" />;
      case 'error':
        return <X className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
        return <Bell className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 rounded-xl shadow-lg p-4 flex items-center gap-3 border backdrop-blur-sm ${getToastStyles()}`}>
      {getIcon()}
      <p className="font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const StatsCard = ({ title, value, change, icon: Icon, color }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default function ProductsAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'createdAt' | 'name_ar' | 'quantity'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSingleDeleteModalOpen, setIsSingleDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{id: string, name: string} | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'warning' | 'info'} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  // صفحات
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // مصادقة
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<{ id: string; email: string; role: string; loginTime?: number } | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState<string[]>([]);

  // إحصائيات
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalValue: 0,
    lowStock: 0
  });

  // التحقق من حالة المصادقة مع تعزيز الأمان
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Timestamp': Date.now().toString()
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
            
            // فحص أمني إضافي
            await performSecurityCheck();
          } else {
            // If response is OK but data is not as expected (e.g., success: false or user missing)
            // This indicates an issue with the auth API's response or a valid but non-successful auth check
            console.error('Authentication check successful, but user data is invalid:', responseData.message);
            setSecurityAlerts(prev => [...prev, responseData.message || 'بيانات المصادقة غير صالحة']);
            router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname) + '&error=auth_data_invalid');
          }
        } else {
          router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setSecurityAlerts(prev => [...prev, 'فشل في التحقق من الهوية']);
        router.push('/admin-login');
      }
    }
    
    checkAuth();
  }, [router]);

  // فحص أمني دوري
  const performSecurityCheck = async () => {
    try {
      const response = await fetch('/api/auth/security-status', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const securityData = await response.json();
        if (securityData.alerts && securityData.alerts.length > 0) {
          setSecurityAlerts(securityData.alerts);
        }
      }
    } catch (error) {
      console.error('Security check failed:', error);
    }
  };

  // جلب البيانات من API
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // حساب الإحصائيات
  useEffect(() => {
    if (products.length > 0) {
      const activeProducts = products.filter(p => p.isActive);
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
      const lowStock = products.filter(p => p.quantity < 5).length;

      setStats({
        totalProducts: products.length,
        activeProducts: activeProducts.length,
        totalValue,
        lowStock
      });
    }
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      
      // Handle new API response structure
      if (data && data.success && data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (data && Array.isArray(data)) {
        // Fallback for old API response format
        setProducts(data);
      } else {
        console.warn('No products found in API response');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('فشل في تحميل المنتجات', 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // تصفية المنتجات المحسنة
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.isActive) ||
                         (filterStatus === 'inactive' && !product.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ترتيب المنتجات المحسن
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'name_ar':
        comparison = a.name_ar.localeCompare(b.name_ar, 'ar');
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // تقسيم الصفحات
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // تغيير ترتيب الفرز
  const toggleSort = (field: 'price' | 'createdAt' | 'name_ar' | 'quantity') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // التحكم باختيار المنتجات
  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(prodId => prodId !== id) 
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === currentProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentProducts.map(p => p._id));
    }
  };

  // تغيير حالة المنتج
  const toggleProductStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'toggle-status' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product status');
      }

      const updatedProduct = await response.json();
      
      // تحديث المنتج في القائمة
      setProducts(prev =>
        prev.map(p =>
          p._id === id ? updatedProduct : p
        )
      );
      
      // إعادة جلب البيانات للتأكد من التحديث
      await fetchProducts();
      
      showToast(`تم ${updatedProduct.isActive ? 'تفعيل' : 'إخفاء'} المنتج بنجاح`, 'success');
    } catch (error) {
      console.error('Error toggling product status:', error);
      showToast('فشل في تحديث حالة المنتج', 'error');
      
      // إعادة جلب البيانات في حالة الخطأ
      await fetchProducts();
    }
  };

  // فتح صندوق تعديل المنتج
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // إضافة منتج جديد
  const handleAddProduct = async (productData: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      const newProduct = await response.json();
      setProducts(prev => [...prev, newProduct]);
      setIsAddModalOpen(false);
      showToast('تمت إضافة المنتج بنجاح', 'success');
      await fetchProducts(); // Re-fetch products
    } catch (error) {
      console.error('Error adding product:', error);
      showToast('فشل في إضافة المنتج', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تحديث منتج
  const handleUpdateProduct = async (productData: any) => {
    if (!editingProduct) return;
    
    setIsSubmitting(true);
    try {
      if (!productData.slug) {
        productData.slug = productData.name_en
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }
      
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      
      setProducts(prev => 
        prev.map(p => 
          p._id === editingProduct._id ? updatedProduct : p
        )
      );
      
      setIsEditModalOpen(false);
      setEditingProduct(null);
      showToast('تم تحديث المنتج بنجاح', 'success');
      await fetchProducts(); // Re-fetch products
    } catch (error) {
      console.error('Error updating product:', error);
      showToast('فشل في تحديث المنتج', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // فتح مودال تأكيد حذف منتج واحد
  const openDeleteSingleModal = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setIsSingleDeleteModalOpen(true);
  };

  // حذف منتج
  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p._id !== id));
      setSelectedProducts(prev => prev.filter(prodId => prodId !== id));
      showToast('تم حذف المنتج بنجاح', 'success');
      await fetchProducts(); // Re-fetch products
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('فشل في حذف المنتج', 'error');
    } finally {
      setIsSingleDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // الحذف الجماعي
  const openDeleteSelectedModal = () => {
    if (selectedProducts.length > 0) {
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteSelected = async () => {
    try {
      const response = await fetch(`/api/products?ids=${selectedProducts.join(',')}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete products');
      }

      const result = await response.json();
      
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p._id)));
      setSelectedProducts([]);
      setIsDeleteModalOpen(false);
      showToast(`تم حذف ${result.deletedCount} منتجات بنجاح`, 'success');
      await fetchProducts(); // Re-fetch products
    } catch (error) {
      console.error('Error in bulk delete:', error);
      showToast('فشل في حذف المنتجات', 'error');
    }
  };

  // إظهار رسالة نجاح/فشل
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // تحديث البيانات
  const refreshProducts = () => {
    fetchProducts();
    showToast('تم تحديث البيانات', 'info');
  };
  
  // تسجيل الخروج المحسن
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (response.ok) {
        // مسح البيانات المحلية
        setAdminData(null);
        setIsAuthenticated(false);
        setProducts([]);
        
        // إعادة توجيه المستخدم
        router.push('/admin-login');
      } else {
        showToast('فشل في تسجيل الخروج', 'error');
      }
    } catch (error) {
      console.error('Logout error:', error);
      showToast('فشل في تسجيل الخروج', 'error');
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  // تصدير البيانات
  const exportData = () => {
    const csvContent = [
      ['الاسم العربي', 'الاسم الإنجليزي', 'السعر', 'الكمية', 'SKU', 'الحالة'],
      ...products.map(p => [
        p.name_ar,
        p.name_en,
        p.price.toString(),
        p.quantity.toString(),
        p.sku,
        p.isActive ? 'نشط' : 'غير نشط'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `products_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showToast('تم تصدير البيانات بنجاح', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">جاري التحقق من الهوية</h3>
          <p className="text-blue-200">يرجى الانتظار...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader 
        adminData={adminData || undefined} 
        onLogout={() => setIsLogoutModalOpen(true)} 
      />

      {/* تنبيهات الأمان */}
      {securityAlerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="mr-3">
              <h3 className="text-sm font-medium text-red-800">تنبيهات أمنية</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {securityAlerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 py-6">
        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="إجمالي المنتجات"
            value={stats.totalProducts.toString()}
            change={`+${Math.floor(Math.random() * 10)}% هذا الشهر`}
            icon={Package}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="المنتجات النشطة"
            value={stats.activeProducts.toString()}
            change={`${Math.round((stats.activeProducts / stats.totalProducts) * 100)}% من الإجمالي`}
            icon={Eye}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard
            title="مخزون منخفض"
            value={stats.lowStock.toString()}
            change={stats.lowStock > 0 ? "يحتاج متابعة" : "جيد"}
            icon={AlertTriangle}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* شريط الأدوات المحسن */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* البحث والفلاتر */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* البحث */}
              <div className="relative flex-grow max-w-md">
                <input 
                  type="text"
                  placeholder="البحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              {/* فلتر الفئة */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الفئات</option>
                <option value="cutters">كتر بلوتر</option>
                <option value="heat-press">مكابس حرارية</option>
                <option value="vinyl">فينيل</option>
              </select>

              {/* فلتر الحالة */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
            
            {/* الأزرار */}
            <div className="flex flex-wrap gap-3">
              {/* تغيير العرض */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
              </div>

              <button 
                onClick={exportData}
                className="bg-green-50 text-green-600 hover:bg-green-100 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <Download size={18} />
                <span>تصدير</span>
              </button>

              <button 
                onClick={refreshProducts} 
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <RefreshCw size={18} />
                <span>تحديث</span>
              </button>

              <Link
                href="/comments-admin"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 rounded-lg px-6 py-2 flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <MessageSquare size={18} />
                <span>إدارة التعليقات</span>
              </Link>
              <Link
                href="/orders-admin"
                className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white hover:from-sky-700 hover:to-cyan-700 rounded-lg px-6 py-2 flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <ShoppingCart size={18} />
                <span>إدارة الطلبات</span>
              </Link>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg px-6 py-2 flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <Plus size={18} />
                <span>إضافة منتج</span>
              </button>

              {selectedProducts.length > 0 && (
                <button 
                  onClick={openDeleteSelectedModal} 
                  className="bg-red-50 text-red-600 hover:bg-red-100 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={18} />
                  <span>حذف {selectedProducts.length}</span>
                </button>
              )}
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>عرض {currentProducts.length} من {sortedProducts.length} منتج</span>
              <span>•</span>
              <span>المحدد: {selectedProducts.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>عرض:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>منتج</span>
            </div>
          </div>
        </div>

        {/* جدول/شبكة المنتجات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
              <span className="text-lg font-medium text-gray-600">جاري التحميل...</span>
              <span className="text-sm text-gray-400 mt-1">يرجى الانتظار</span>
            </div>
          ) : viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input 
                        type="checkbox"
                        checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => toggleSort('name_ar')}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        المنتج
                        {sortBy === 'name_ar' && (
                          sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => toggleSort('price')}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        السعر
                        {sortBy === 'price' && (
                          sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => toggleSort('quantity')}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        الكمية
                        {sortBy === 'quantity' && (
                          sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => toggleSort('createdAt')}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        تاريخ الإضافة
                        {sortBy === 'createdAt' && (
                          sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => toggleProductSelection(product._id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 relative rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={product.images[0]?.url || '/placeholder-image.png'}
                                alt={product.name_ar}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name_ar}
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.name_en}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.price.toLocaleString()} ج.م
                          </div>
                          {product.sale_price && (
                            <div className="text-xs text-gray-500 line-through">
                              {product.sale_price.toLocaleString()} ج.م
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.quantity > 10 
                              ? 'bg-green-100 text-green-800' 
                              : product.quantity > 5 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {product.sku}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(product.createdAt).toLocaleDateString('ar-EG')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => toggleProductStatus(product._id)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              product.isActive 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {product.isActive ? (
                              <>
                                <Eye size={12} className="mr-1" />
                                نشط
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} className="mr-1" />
                                مخفي
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditModal(product)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                              title="تعديل"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => openDeleteSingleModal(product._id, product.name_ar)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                              title="حذف"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <Package className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
                          <p className="text-gray-500">لا توجد منتجات متطابقة مع البحث أو الفلاتر المحددة</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // عرض الشبكة
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-square relative">
                        <Image
                          src={product.images[0]?.url || '/placeholder-image.png'}
                          alt={product.name_ar}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2">
                        <input 
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => toggleProductSelection(product._id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <button 
                          onClick={() => toggleProductStatus(product._id)}
                          className={`p-1 rounded-full ${
                            product.isActive 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {product.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name_ar}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.name_en}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {product.price.toLocaleString()} ج.م
                        </span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          product.quantity > 10 
                            ? 'bg-green-100 text-green-800' 
                            : product.quantity > 5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          تعديل
                        </button>
                        <button 
                          onClick={() => openDeleteSingleModal(product._id, product.name_ar)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* تقسيم الصفحات المحسن */}
          {sortedProducts.length > 0 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-700">
                عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى <span className="font-medium">
                  {Math.min(indexOfLastItem, sortedProducts.length)}
                </span> من <span className="font-medium">{sortedProducts.length}</span> منتج
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  الأول
                </button>
                <button
                  onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  السابق
                </button>
                
                {/* أرقام الصفحات */}
                <div className="flex gap-1">
                  {(() => {
                    const pages: React.ReactNode[] = [];
                    const maxVisibleButtons = 3; // Number of page buttons to show around current page, besides first/last and ellipsis
                    const sideButtons = 1; // Number of buttons to show from start/end if not clashing with middle window

                    if (totalPages <= 1) return null; // No pagination if 1 page or less

                    // Helper to add a page button
                    const addPageButton = (pageNumber: number) => {
                      pages.push(
                        <button
                          key={`page-${pageNumber}`}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    };

                    // Helper to add ellipsis
                    const addEllipsis = (key: string) => {
                      pages.push(<span key={key} className="px-3 py-2 text-sm font-medium text-gray-700">...</span>);
                    };

                    // Always add first page
                    addPageButton(1);

                    let rangeStart = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
                    let rangeEnd = Math.min(totalPages - 1, currentPage + Math.floor(maxVisibleButtons / 2));
                    
                    if (totalPages > (sideButtons * 2) + maxVisibleButtons + 2) { // Check if ellipsis are needed
                        if (rangeStart > 2) {
                            addEllipsis('start-ellipsis');
                        }
                    } else { // Not enough pages for full ellipsis logic, show all pages between 1 and totalPages
                        rangeStart = 2;
                        rangeEnd = totalPages - 1;
                    }
                    
                    for (let i = rangeStart; i <= rangeEnd; i++) {
                        addPageButton(i);
                    }

                    if (totalPages > (sideButtons * 2) + maxVisibleButtons + 2) {
                        if (rangeEnd < totalPages - 1) {
                            addEllipsis('end-ellipsis');
                        }
                    }
                    
                    // Always add last page if totalPages > 1
                    if (totalPages > 1) {
                      addPageButton(totalPages);
                    }

                    return pages;
                  })()}
                </div>

                <button
                  onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  التالي
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  الأخير
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* الرسالة المنبثقة */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* مودال إضافة منتج جديد */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl mx-auto my-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                إضافة منتج جديد
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-2">
              <ProductForm
                onSubmit={handleAddProduct}
                onCancel={() => setIsAddModalOpen(false)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* مودال تعديل منتج */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl mx-auto my-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                تعديل المنتج: {editingProduct.name_ar}
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-2">
              <ProductForm
                initialData={editingProduct}
                onSubmit={handleUpdateProduct}
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                }}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* مودال تأكيد الحذف الجماعي */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">تأكيد الحذف الجماعي</h2>
            </div>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف <span className="font-bold text-red-600">{selectedProducts.length}</span> منتجات؟ 
              <br />
              <span className="text-sm text-red-500">لا يمكن التراجع عن هذه العملية.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDeleteSelected}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* مودال تأكيد حذف منتج واحد */}
      {isSingleDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">تأكيد حذف المنتج</h2>
            </div>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف المنتج <span className="font-bold">"{productToDelete.name}"</span>؟
              <br />
              <span className="text-sm text-red-500">لا يمكن التراجع عن هذه العملية.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsSingleDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => deleteProduct(productToDelete.id)}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                نعم، حذف المنتج
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* مودال تأكيد تسجيل الخروج */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <LogOut className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">تأكيد تسجيل الخروج</h2>
            </div>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من تسجيل الخروج من لوحة الإدارة؟
              <br />
              <span className="text-sm text-gray-500">سيتم إنهاء جلستك الحالية.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <LogOut size={16} />
                تأكيد تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
