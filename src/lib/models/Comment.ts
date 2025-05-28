export interface Comment {
  _id?: string;
  productId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  verified: boolean;
  helpful: {
    count: number;
    users: string[];
  };
  status: 'active' | 'pending' | 'hidden';
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentStats {
  totalComments: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  verifiedCount: number;
}

export interface CommentResponse {
  comments: Comment[];
  stats: CommentStats;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Helper functions for comment operations
export class CommentService {
  static calculateStats(comments: Comment[]): CommentStats {
    const activeComments = comments.filter(c => c.status === 'active');
    const totalComments = activeComments.length;
    
    if (totalComments === 0) {
      return {
        totalComments: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        verifiedCount: 0
      };
    }

    const averageRating = activeComments.reduce((sum, c) => sum + c.rating, 0) / totalComments;
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    activeComments.forEach(comment => {
      ratingDistribution[comment.rating as keyof typeof ratingDistribution]++;
    });

    const verifiedCount = activeComments.filter(c => c.verified).length;

    return {
      totalComments,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      verifiedCount
    };
  }

  static validateComment(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    console.log('[CommentService] Validating comment data:', JSON.stringify(data, null, 2));

    if (!data.userName || typeof data.userName !== 'string' || data.userName.trim().length < 2) {
      errors.push('اسم المستخدم مطلوب ويجب أن يكون على الأقل حرفين');
    }

    if (!data.rating || typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
      errors.push('التقييم مطلوب ويجب أن يكون بين 1 و 5');
    }

    if (!data.comment || typeof data.comment !== 'string' || data.comment.trim().length < 10) {
      errors.push('التعليق مطلوب ويجب أن يكون على الأقل 10 أحرف');
    }

    if (data.comment && data.comment.length > 1000) {
      errors.push('التعليق يجب أن يكون أقل من 1000 حرف');
    }

    if (data.title && data.title.length > 100) {
      errors.push('العنوان يجب أن يكون أقل من 100 حرف');
    }

    if (data.pros && (!Array.isArray(data.pros) || data.pros.length > 5)) {
      errors.push('المميزات يجب أن تكون مصفوفة وأقل من 5 عناصر');
    }

    if (data.cons && (!Array.isArray(data.cons) || data.cons.length > 5)) {
      errors.push('العيوب يجب أن تكون مصفوفة وأقل من 5 عناصر');
    }

    console.log('[CommentService] Validation result:', { isValid: errors.length === 0, errors });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static sanitizeInput(text: string): string {
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }

  static formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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
  }
}