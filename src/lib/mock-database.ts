// Mock Database for Comments System
// Works without MongoDB - Perfect for Vercel deployment

export interface Comment {
  _id: string;
  productId: string;
  userName: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage (will reset on server restart)
let commentsStore: Comment[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    productId: 'high-tech-cutter-plotter',
    userName: 'أحمد محمد',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    comment: 'منتج ممتاز جداً! استخدمته في مشروعي وكانت النتائج رائعة. سرعة القطع عالية والدقة ممتازة.',
    rating: 5,
    status: 'approved',
    verified: true,
    helpful: 12,
    createdAt: new Date('2024-12-01T10:00:00Z'),
    updatedAt: new Date('2024-12-01T10:00:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439012',
    productId: 'high-tech-cutter-plotter',
    userName: 'فاطمة علي',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    comment: 'جهاز رائع للمشاريع الصغيرة. سهل الاستخدام وجودة القطع ممتازة. أنصح به بشدة.',
    rating: 5,
    status: 'approved',
    verified: false,
    helpful: 8,
    createdAt: new Date('2024-12-02T14:30:00Z'),
    updatedAt: new Date('2024-12-02T14:30:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    productId: 'high-tech-cutter-plotter',
    userName: 'محمد السعيد',
    name: 'محمد السعيد',
    email: 'mohamed@example.com',
    comment: 'استخدمته في ورشتي لقطع الفينيل. النتائج فاقت توقعاتي. سرعة ودقة عالية.',
    rating: 4,
    status: 'approved',
    verified: true,
    helpful: 5,
    createdAt: new Date('2024-12-03T09:15:00Z'),
    updatedAt: new Date('2024-12-03T09:15:00Z')
  }
];

// Helper function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export class MockCommentDatabase {
  // Get comments by product ID with pagination
  static async getCommentsByProductId(
    productId: string,
    page: number = 1,
    limit: number = 10,
    sort: 'newest' | 'oldest' | 'helpful' = 'newest'
  ): Promise<{ comments: Comment[]; total: number }> {
    console.log(`[MockDB] Getting comments for product: ${productId}, page: ${page}, limit: ${limit}, sort: ${sort}`);
    
    // Filter comments by product ID and approved status
    let filteredComments = commentsStore.filter(
      comment => comment.productId === productId && comment.status === 'approved'
    );

    // Sort comments
    switch (sort) {
      case 'newest':
        filteredComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filteredComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'helpful':
        filteredComments.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedComments = filteredComments.slice(startIndex, endIndex);

    console.log(`[MockDB] Found ${filteredComments.length} total comments, returning ${paginatedComments.length} for page ${page}`);

    return {
      comments: paginatedComments,
      total: filteredComments.length
    };
  }

  // Add a new comment
  static async addComment(commentData: Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    console.log('[MockDB] Adding new comment:', commentData);

    const newComment: Comment = {
      ...commentData,
      _id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    commentsStore.push(newComment);
    
    console.log(`[MockDB] Comment added successfully with ID: ${newComment._id}`);
    console.log(`[MockDB] Total comments in store: ${commentsStore.length}`);

    return newComment;
  }

  // Update helpful count for a comment
  static async updateHelpfulCount(commentId: string, userId: string, isHelpful: boolean): Promise<boolean> {
    console.log(`[MockDB] Updating helpful count for comment: ${commentId}, user: ${userId}, helpful: ${isHelpful}`);

    const commentIndex = commentsStore.findIndex(comment => comment._id === commentId);
    
    if (commentIndex === -1) {
      console.log(`[MockDB] Comment not found: ${commentId}`);
      return false;
    }

    // For simplicity, just increment/decrement the helpful count
    // In a real app, you'd track which users voted
    if (isHelpful) {
      const comment = commentsStore[commentIndex];
      if (comment) {
        comment.helpful += 1;
      }
    } else {
      const comment = commentsStore[commentIndex];
      if (comment) {
        comment.helpful = Math.max(0, comment.helpful - 1);
      }
    }

    const comment = commentsStore[commentIndex];
    if (comment) {
      comment.updatedAt = new Date();
      console.log(`[MockDB] Updated helpful count to: ${comment.helpful}`);
    }
    return true;
  }

  // Get comment by ID
  static async getCommentById(commentId: string): Promise<Comment | null> {
    console.log(`[MockDB] Getting comment by ID: ${commentId}`);
    
    const comment = commentsStore.find(comment => comment._id === commentId);
    
    if (comment) {
      console.log(`[MockDB] Found comment: ${comment.userName}`);
    } else {
      console.log(`[MockDB] Comment not found: ${commentId}`);
    }

    return comment || null;
  }

  // Get all comments (for admin)
  static async getAllComments(): Promise<Comment[]> {
    console.log(`[MockDB] Getting all comments, total: ${commentsStore.length}`);
    return [...commentsStore];
  }

  // Update comment status (for admin)
  static async updateCommentStatus(commentId: string, status: 'pending' | 'approved' | 'rejected'): Promise<boolean> {
    console.log(`[MockDB] Updating comment status: ${commentId} to ${status}`);

    const commentIndex = commentsStore.findIndex(comment => comment._id === commentId);
    
    if (commentIndex === -1) {
      console.log(`[MockDB] Comment not found: ${commentId}`);
      return false;
    }

    const comment = commentsStore[commentIndex];
    if (comment) {
      comment.status = status;
      comment.updatedAt = new Date();
    }

    console.log(`[MockDB] Comment status updated successfully`);
    return true;
  }

  // Delete comment (for admin)
  static async deleteComment(commentId: string): Promise<boolean> {
    console.log(`[MockDB] Deleting comment: ${commentId}`);

    const commentIndex = commentsStore.findIndex(comment => comment._id === commentId);
    
    if (commentIndex === -1) {
      console.log(`[MockDB] Comment not found: ${commentId}`);
      return false;
    }

    commentsStore.splice(commentIndex, 1);

    console.log(`[MockDB] Comment deleted successfully. Remaining comments: ${commentsStore.length}`);
    return true;
  }

  // Get comments statistics
  static async getCommentsStats(): Promise<{
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  }> {
    const stats = {
      total: commentsStore.length,
      approved: commentsStore.filter(c => c.status === 'approved').length,
      pending: commentsStore.filter(c => c.status === 'pending').length,
      rejected: commentsStore.filter(c => c.status === 'rejected').length
    };

    console.log('[MockDB] Comments stats:', stats);
    return stats;
  }
}

// Export for backward compatibility
export const CommentDatabase = MockCommentDatabase;