'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

interface Comment {
  _id: string;
  productId: string;
  userName: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  helpful: {
    count: number;
    users: string[];
  } | number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCommentsProps {
  productId: string;
  productName: string;
}

interface QuickCommentData {
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
}

const ProductComments: React.FC<ProductCommentsProps> = ({ productId, productName }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [quickCommentData, setQuickCommentData] = useState<QuickCommentData>({
    userName: '',
    userEmail: '',
    rating: 5,
    comment: ''
  });
  const [quickCommentErrors, setQuickCommentErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Load comments
  const loadComments = async (page: number = 1) => {
    try {
      setLoading(true);
      console.log(`[ProductComments] Loading comments for product: ${productId}, page: ${page}`);
      
      const response = await fetch(`/api/comments/${productId}?page=${page}&limit=10&sort=newest`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('[ProductComments] Comments loaded:', data);
      
      if (data.success) {
        setComments(data.comments || []);
        setTotalComments(data.total || 0);
      } else {
        console.error('[ProductComments] Failed to load comments:', data.error);
        setComments([]);
        setTotalComments(0);
      }
    } catch (error) {
      console.error('[ProductComments] Error loading comments:', error);
      setComments([]);
      setTotalComments(0);
    } finally {
      setLoading(false);
    }
  };

  // Load comments on component mount
  useEffect(() => {
    if (productId) {
      loadComments(currentPage);
    }
  }, [productId, currentPage]);

  // Handle quick comment submission
  const handleQuickCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickSubmitting(true);
    setQuickCommentErrors([]);

    try {
      console.log('[ProductComments] Starting quick comment submission for product:', productId);
      
      // Validate quick comment
      const errors: string[] = [];
      if (!quickCommentData.userName.trim()) {
        errors.push('الاسم مطلوب');
      }
      if (!quickCommentData.comment.trim() || quickCommentData.comment.trim().length < 10) {
        errors.push('التعليق مطلوب ويجب أن يكون على الأقل 10 أحرف');
      }

      if (errors.length > 0) {
        console.log('[ProductComments] Validation errors:', errors);
        setQuickCommentErrors(errors);
        setQuickSubmitting(false);
        return;
      }

      const submitData = {
        name: quickCommentData.userName.trim(),
        email: quickCommentData.userEmail.trim() || 'anonymous@example.com',
        rating: quickCommentData.rating,
        comment: quickCommentData.comment.trim()
      };

      console.log('[ProductComments] Submitting data:', submitData);

      const response = await fetch(`/api/comments/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('[ProductComments] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ProductComments] Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('[ProductComments] Response result:', result);

      if (result.success) {
        console.log('[ProductComments] Comment submitted successfully');
        
        // Reset form
        setQuickCommentData({
          userName: '',
          userEmail: '',
          rating: 5,
          comment: ''
        });
        
        // Don't reload comments immediately since new comment is pending approval
        // await loadComments(1);
        // setCurrentPage(1);
        
        // Show success message
        setSuccessMessage(result.message || 'تم ارسال التعليق للمراجعة');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        throw new Error(result.error || 'فشل في إضافة التعليق');
      }
    } catch (error) {
      console.error('[ProductComments] Submission error:', error);
      setQuickCommentErrors([error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة التعليق']);
    } finally {
      setQuickSubmitting(false);
    }
  };

  // Handle helpful click
  const handleHelpfulClick = async (commentId: string) => {
    try {
      console.log('[ProductComments] Marking comment as helpful:', commentId);
      
      const response = await fetch(`/api/comments/helpful/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isHelpful: true }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('[ProductComments] Helpful response:', result);
        
        // Update the comment in the local state
        setComments(prevComments =>
          prevComments.map(comment =>
            comment._id === commentId
              ? { 
                  ...comment, 
                  helpful: result.helpfulCount || (
                    typeof comment.helpful === 'number' 
                      ? comment.helpful + 1 
                      : comment.helpful.count + 1
                  )
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('[ProductComments] Error marking as helpful:', error);
    }
  };

  // Format time ago
  const formatTimeAgo = (date: Date | string): string => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'منذ لحظات';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `منذ ${minutes} دقيقة`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `منذ ${hours} ساعة`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `منذ ${days} يوم`;
    } else {
      const months = Math.floor(diffInSeconds / 2592000);
      return `منذ ${months} شهر`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircle className="h-6 w-6 text-primary-600 ml-2" />
          <h3 className="text-xl font-bold text-gray-900">
            آراء العملاء ({totalComments})
          </h3>
        </div>
      </div>

      {/* Quick Comment Form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">أضف تعليقك السريع</h4>
        
        <form onSubmit={handleQuickCommentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم *
              </label>
              <input
                type="text"
                value={quickCommentData.userName}
                onChange={(e) => setQuickCommentData(prev => ({ ...prev, userName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="اسمك الكريم"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني (اختياري)
              </label>
              <input
                type="email"
                value={quickCommentData.userEmail}
                onChange={(e) => setQuickCommentData(prev => ({ ...prev, userEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تقييمك للمنتج *
            </label>
            <div className="flex items-center space-x-1 space-x-reverse">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setQuickCommentData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none transition-colors duration-200"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= quickCommentData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
              ))}
              <span className="mr-2 text-sm text-gray-600">
                ({quickCommentData.rating} من 5 نجوم)
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعليقك *
            </label>
            <textarea
              value={quickCommentData.comment}
              onChange={(e) => setQuickCommentData(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="شاركنا رأيك في المنتج..."
              required
            />
          </div>

          {/* Error Messages */}
          {quickCommentErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <ul className="text-red-600 text-sm space-y-1">
                {quickCommentErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 relative">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-green-800 text-sm font-medium">
                    {successMessage}
                  </p>
                </div>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="text-green-500 hover:text-green-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={quickSubmitting}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {quickSubmitting ? (
              <>
                <Clock className="h-4 w-4 ml-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 ml-2" />
                إرسال التعليق
              </>
            )}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">جاري تحميل التعليقات...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد تعليقات بعد. كن أول من يعلق!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4 space-x-reverse">
                <Avatar name={comment.userName} size="md" />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-gray-900">{comment.userName}</h4>
                      {comment.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center ml-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < comment.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {comment.comment}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleHelpfulClick(comment._id)}
                      className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4 ml-1" />
                      مفيد ({typeof comment.helpful === 'number' ? comment.helpful : comment.helpful.count})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalComments > 10 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              السابق
            </button>
            
            <span className="px-4 py-2 text-gray-700">
              صفحة {currentPage} من {Math.ceil(totalComments / 10)}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil(totalComments / 10)}
              className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComments;