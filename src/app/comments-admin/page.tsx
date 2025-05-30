'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare, Search, Filter, MoreHorizontal, Trash2, Eye, EyeOff,
  ThumbsUp, ThumbsDown, Star, Calendar, Clock, User, AlertTriangle,
  CheckCircle, XCircle, RefreshCw, Download, BarChart3, TrendingUp,
  Heart, Flag, Reply, Edit, Archive, Bookmark, Send, ArrowLeft,
  LayoutDashboard, ShoppingCart
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import Link from 'next/link';

// أنواع البيانات
interface Comment {
  _id: string;
  productId: string;
  productName: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  isHelpful: number;
  createdAt: string;
  updatedAt: string;
  replies?: Reply[];
  flagged?: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface Reply {
  _id: string;
  userName: string;
  comment: string;
  createdAt: string;
  isAdmin: boolean;
}

interface CommentStats {
  total: number;
  approved: number;
  pending: number;
  flagged: number;
  averageRating: number;
  helpfulCount: number;
}

// مكونات واجهة المستخدم
const Toast = ({ message, type, onClose }: { 
  message: string; 
  type: 'success' | 'error' | 'warning' | 'info'; 
  onClose: () => void 
}) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5" />;
      case 'error': return <XCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'info': return <MessageSquare className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 rounded-xl shadow-lg p-4 flex items-center gap-3 border backdrop-blur-sm ${getToastStyles()}`}>
      {getIcon()}
      <p className="font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700 transition-colors">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

const StatsCard = ({ title, value, change, icon: Icon, color, trend }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-1">
          {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
          {trend === 'down' && <TrendingUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />}
          <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
            {change}
          </p>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const RatingStars = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

export default function CommentsAdminPage() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'flagged'>('all');
  const [filterRating, setFilterRating] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'rating' | 'helpful'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'warning' | 'info'} | null>(null);
  const [stats, setStats] = useState<CommentStats>({
    total: 0,
    approved: 0,
    pending: 0,
    flagged: 0,
    averageRating: 0,
    helpfulCount: 0
  });

  // مصادقة
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<{ id: string; email: string; role: string; loginTime?: number } | null>(null);

  // مودالات
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyingToComment, setReplyingToComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  // التحقق من المصادقة
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
            // Optionally, set an error state or show a toast
            // showToast(responseData.message || 'بيانات المصادقة غير صالحة', 'error');
            router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname) + '&error=auth_data_invalid');
          }
        } else {
          router.push('/admin-login?from=' + encodeURIComponent(window.location.pathname));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin-login');
      }
    }
    
    checkAuth();
  }, [router]);

  // جلب التعليقات
  useEffect(() => {
    if (isAuthenticated) {
      fetchComments();
    }
  }, [isAuthenticated]);

  // حساب الإحصائيات
  useEffect(() => {
    if (comments.length > 0) {
      const approved = comments.filter(c => c.isApproved);
      const pending = comments.filter(c => !c.isApproved);
      const flagged = comments.filter(c => c.flagged);
      const totalRating = comments.reduce((sum, c) => sum + c.rating, 0);
      const helpfulCount = comments.reduce((sum, c) => sum + c.isHelpful, 0);

      setStats({
        total: comments.length,
        approved: approved.length,
        pending: pending.length,
        flagged: flagged.length,
        averageRating: comments.length > 0 ? totalRating / comments.length : 0,
        helpfulCount
      });
    }
  }, [comments]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments/admin?page=${currentPage}&limit=${itemsPerPage}&status=${filterStatus}&sortBy=${sortBy}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      
      // تحويل البيانات لتتوافق مع الواجهة
      const transformedComments: Comment[] = data.comments.map((comment: any) => ({
        _id: comment._id,
        productId: comment.productId,
        productName: comment.productId, // يمكن تحسين هذا لاحقاً
        userName: comment.userName,
        userEmail: comment.userEmail,
        rating: comment.rating,
        comment: comment.comment,
        isApproved: comment.status === 'active',
        isHelpful: comment.helpful?.count || 0,
        createdAt: new Date(comment.createdAt).toISOString(),
        updatedAt: new Date(comment.updatedAt).toISOString(),
        sentiment: comment.rating >= 4 ? 'positive' : comment.rating <= 2 ? 'negative' : 'neutral',
        flagged: comment.status === 'hidden'
      }));

      setComments(transformedComments);
      setTotalComments(data.total);
      showToast('تم جلب التعليقات بنجاح', 'success');
    } catch (error) {
      console.error('Error fetching comments:', error);
      showToast('فشل في جلب التعليقات', 'error');
      // في حالة الخطأ، استخدم بيانات محاكاة
      const mockComments: Comment[] = [
        {
          _id: '1',
          productId: 'prod1',
          productName: 'كتر بلوتر احترافي',
          userName: 'أحمد محمد',
          userEmail: 'ahmed@example.com',
          rating: 5,
          comment: 'منتج ممتاز جداً، جودة عالية وسعر مناسب. أنصح به بشدة',
          isApproved: true,
          isHelpful: 12,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          sentiment: 'positive'
        },
        {
          _id: '2',
          productId: 'prod2',
          productName: 'مكبس حراري متوسط',
          userName: 'فاطمة علي',
          userEmail: 'fatima@example.com',
          rating: 4,
          comment: 'جيد لكن يحتاج تحسين في التعليمات',
          isApproved: false,
          isHelpful: 3,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString(),
          sentiment: 'neutral'
        },
        {
          _id: '3',
          productId: 'prod1',
          productName: 'كتر بلوتر احترافي',
          userName: 'محمد سالم',
          userEmail: 'mohamed@example.com',
          rating: 2,
          comment: 'لم يعجبني المنتج، جودة ضعيفة',
          isApproved: true,
          isHelpful: 1,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          updatedAt: new Date(Date.now() - 259200000).toISOString(),
          flagged: true,
          sentiment: 'negative'
        }
      ];
      
      setComments(mockComments);
      setTotalComments(mockComments.length);
    } finally {
      setLoading(false);
    }
  };

  // تصفية وترتيب التعليقات
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'approved' && comment.isApproved) ||
                         (filterStatus === 'pending' && !comment.isApproved) ||
                         (filterStatus === 'flagged' && comment.flagged);
    
    const matchesRating = filterRating === 'all' || comment.rating === parseInt(filterRating);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'helpful':
        comparison = a.isHelpful - b.isHelpful;
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
  const currentComments = sortedComments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedComments.length / itemsPerPage);

  // وظائف الإدارة
  const toggleCommentApproval = async (commentId: string) => {
    try {
      const comment = comments.find(c => c._id === commentId);
      if (!comment) return;

      const action = comment.isApproved ? 'reject' : 'approve';
      
      const response = await fetch(`/api/comments/admin/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle comment approval');
      }

      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? { ...comment, isApproved: !comment.isApproved }
            : comment
        )
      );
      
      const message = action === 'approve' ? 'تم اعتماد التعليق بنجاح' : 'تم رفض التعليق بنجاح';
      showToast(message, 'success');
    } catch (error) {
      console.error('Error toggling comment approval:', error);
      showToast('فشل في تحديث حالة التعليق', 'error');
    }
  };

  const toggleCommentFlag = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/admin/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'toggle-status' }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle comment flag');
      }

      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? { ...comment, flagged: !comment.flagged }
            : comment
        )
      );
      showToast('تم تحديث علامة التعليق بنجاح', 'success');
    } catch (error) {
      console.error('Error toggling comment flag:', error);
      showToast('فشل في تحديث علامة التعليق', 'error');
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/admin/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(prev => prev.filter(comment => comment._id !== commentId));
      setTotalComments(prev => prev - 1);
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
      showToast('تم حذف التعليق بنجاح', 'success');
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast('فشل في حذف التعليق', 'error');
    }
  };

  const addReply = async () => {
    if (!replyingToComment || !replyText.trim()) return;
    
    try {
      const newReply: Reply = {
        _id: Date.now().toString(),
        userName: 'المسؤول',
        comment: replyText,
        createdAt: new Date().toISOString(),
        isAdmin: true
      };

      setComments(prev => 
        prev.map(comment => 
          comment._id === replyingToComment._id 
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );

      setIsReplyModalOpen(false);
      setReplyingToComment(null);
      setReplyText('');
      showToast('تم إضافة الرد بنجاح', 'success');
    } catch (error) {
      showToast('فشل في إضافة الرد', 'error');
    }
  };

  const exportComments = () => {
    const csvContent = [
      ['المنتج', 'المستخدم', 'التقييم', 'التعليق', 'الحالة', 'التاريخ'],
      ...comments.map(c => [
        c.productName,
        c.userName,
        c.rating.toString(),
        c.comment,
        c.isApproved ? 'معتمد' : 'في الانتظار',
        new Date(c.createdAt).toLocaleDateString('ar-EG')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `comments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showToast('تم تصدير التعليقات بنجاح', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleLogout = () => {
    router.push('/admin-login');
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
        onLogout={handleLogout} 
      />

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 pb-6 pt-30 lg:pt-22">
        {/* العنوان والتنقل */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/products-admin"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" /> {/* Changed Icon */}
              <span>لوحة التحكم الرئيسية</span> {/* Changed Text */}
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <Link
              href="/orders-admin"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>إدارة الطلبات</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center"> {/* Adjusted color */}
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إدارة التعليقات</h1>
                <p className="text-gray-600">إدارة وتنظيم تعليقات العملاء</p>
              </div>
            </div>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <StatsCard
            title="إجمالي التعليقات"
            value={stats.total.toString()}
            change={`+${Math.floor(Math.random() * 10)}% هذا الشهر`}
            icon={MessageSquare}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend="up"
          />
          <StatsCard
            title="التعليقات المعتمدة"
            value={stats.approved.toString()}
            change={`${Math.round((stats.approved / stats.total) * 100)}% من الإجمالي`}
            icon={CheckCircle}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend="up"
          />
          <StatsCard
            title="في الانتظار"
            value={stats.pending.toString()}
            change={`${Math.round((stats.pending / stats.total) * 100)}% من الإجمالي`}
            icon={Clock}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            trend="neutral"
          />
          <StatsCard
            title="المبلغ عنها"
            value={stats.flagged.toString()}
            change={stats.flagged > 0 ? "يحتاج مراجعة" : "لا توجد"}
            icon={Flag}
            color="bg-gradient-to-r from-red-500 to-red-600"
            trend={stats.flagged > 0 ? "down" : "neutral"}
          />
          <StatsCard
            title="متوسط التقييم"
            value={stats.averageRating.toFixed(1)}
            change={stats.averageRating >= 4 ? "ممتاز" : stats.averageRating >= 3 ? "جيد" : "يحتاج تحسين"}
            icon={Star}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend={stats.averageRating >= 4 ? "up" : "neutral"}
          />
          <StatsCard
            title="التعليقات المفيدة"
            value={stats.helpfulCount.toString()}
            change={`${Math.round((stats.helpfulCount / stats.total) * 100)}% معدل الفائدة`}
            icon={ThumbsUp}
            color="bg-gradient-to-r from-indigo-500 to-indigo-600"
            trend="up"
          />
        </div>

        {/* شريط الأدوات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* البحث والفلاتر */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* البحث */}
              <div className="relative flex-grow max-w-md">
                <input 
                  type="text"
                  placeholder="البحث في التعليقات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              {/* فلتر الحالة */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="approved">معتمد</option>
                <option value="pending">في الانتظار</option>
                <option value="flagged">مبلغ عنه</option>
              </select>

              {/* فلتر التقييم */}
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع التقييمات</option>
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="2">نجمتان</option>
                <option value="1">نجمة واحدة</option>
              </select>

              {/* ترتيب */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt-desc">الأحدث أولاً</option>
                <option value="createdAt-asc">الأقدم أولاً</option>
                <option value="rating-desc">أعلى تقييم</option>
                <option value="rating-asc">أقل تقييم</option>
                <option value="helpful-desc">الأكثر فائدة</option>
              </select>
            </div>
            
            {/* الأزرار */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={exportComments}
                className="bg-green-50 text-green-600 hover:bg-green-100 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <Download size={18} />
                <span>تصدير</span>
              </button>

              <button 
                onClick={fetchComments} 
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <RefreshCw size={18} />
                <span>تحديث</span>
              </button>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>عرض {currentComments.length} من {sortedComments.length} تعليق</span>
              <span>•</span>
              <span>المحدد: {selectedComments.length}</span>
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
              </select>
              <span>تعليق</span>
            </div>
          </div>
        </div>

        {/* قائمة التعليقات */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
              <span className="text-lg font-medium text-gray-600">جاري التحميل...</span>
            </div>
          ) : currentComments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {currentComments.map((comment) => (
                <div key={comment._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* معلومات المستخدم والمنتج */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{comment.userName}</h3>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{comment.productName}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <RatingStars rating={comment.rating} />
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* نص التعليق */}
                      <div className="mb-4">
                        <p className="text-gray-800 leading-relaxed">{comment.comment}</p>
                      </div>

                      {/* الحالة والإحصائيات */}
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          comment.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comment.isApproved ? 'معتمد' : 'في الانتظار'}
                        </span>
                        
                        {comment.flagged && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Flag className="h-3 w-3 mr-1" />
                            مبلغ عنه
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.isHelpful}</span>
                          <span>مفيد</span>
                        </div>

                        {comment.sentiment && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            comment.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                            comment.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {comment.sentiment === 'positive' ? 'إيجابي' :
                             comment.sentiment === 'negative' ? 'سلبي' : 'محايد'}
                          </span>
                        )}
                      </div>

                      {/* الردود */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">الردود:</h4>
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="mb-3 last:mb-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-medium ${
                                  reply.isAdmin ? 'text-blue-600' : 'text-gray-700'
                                }`}>
                                  {reply.userName}
                                  {reply.isAdmin && (
                                    <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                                      مسؤول
                                    </span>
                                  )}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(reply.createdAt).toLocaleDateString('ar-EG')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleCommentApproval(comment._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          comment.isApproved
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-yellow-600 hover:bg-yellow-50'
                        }`}
                        title={comment.isApproved ? 'إلغاء الاعتماد' : 'اعتماد التعليق'}
                      >
                        {comment.isApproved ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>

                      <button
                        onClick={() => toggleCommentFlag(comment._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          comment.flagged
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        title={comment.flagged ? 'إزالة العلامة' : 'وضع علامة'}
                      >
                        <Flag size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setReplyingToComment(comment);
                          setIsReplyModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="إضافة رد"
                      >
                        <Reply size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setCommentToDelete(comment);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف التعليق"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تعليقات</h3>
              <p className="text-gray-500">لا توجد تعليقات متطابقة مع البحث أو الفلاتر المحددة</p>
            </div>
          )}

          {/* تقسيم الصفحات */}
          {sortedComments.length > 0 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-700">
                عرض <span className="font-medium">{indexOfFirstItem + 1}</span> إلى <span className="font-medium">
                  {Math.min(indexOfLastItem, sortedComments.length)}
                </span> من <span className="font-medium">{sortedComments.length}</span> تعليق
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
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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

      {/* مودال إضافة رد */}
      {isReplyModalOpen && replyingToComment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Reply className="h-4 w-4 text-white" />
                </div>
                الرد على تعليق {replyingToComment.userName}
              </h2>
              <button
                onClick={() => {
                  setIsReplyModalOpen(false);
                  setReplyingToComment(null);
                  setReplyText('');
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* التعليق الأصلي */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">{replyingToComment.userName}</span>
                <RatingStars rating={replyingToComment.rating} />
              </div>
              <p className="text-gray-700 text-sm">{replyingToComment.comment}</p>
            </div>

            {/* نموذج الرد */}
            <div className="space-y-4">
              <div>
                <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
                  ردك كمسؤول:
                </label>
                <textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="اكتب ردك هنا..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsReplyModalOpen(false);
                    setReplyingToComment(null);
                    setReplyText('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={addReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  إرسال الرد
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مودال تأكيد الحذف */}
      {isDeleteModalOpen && commentToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">تأكيد حذف التعليق</h2>
            </div>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف تعليق <span className="font-bold">"{commentToDelete.userName}"</span>؟
              <br />
              <span className="text-sm text-red-500">لا يمكن التراجع عن هذه العملية.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCommentToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => deleteComment(commentToDelete._id)}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                نعم، حذف التعليق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الرسالة المنبثقة */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}