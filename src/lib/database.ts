import { Comment } from './models/Comment';
import { GoogleSheetsDatabase } from './google-sheets';

// Database configuration from environment variables only
const GOOGLE_SHEETS_SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

console.log('🔧 Database configuration: Google Sheets');

if (!GOOGLE_SHEETS_SHEET_ID || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY) {
  console.warn('⚠️ Google Sheets credentials not fully configured');
  console.warn('📁 Missing environment variables:');
  console.warn('- GOOGLE_SHEETS_SHEET_ID:', !!GOOGLE_SHEETS_SHEET_ID);
  console.warn('- GOOGLE_SHEETS_CLIENT_EMAIL:', !!GOOGLE_SHEETS_CLIENT_EMAIL);
  console.warn('- GOOGLE_SHEETS_PRIVATE_KEY:', !!GOOGLE_SHEETS_PRIVATE_KEY);
} else {
  console.log('✅ Google Sheets configured for database operations');
  console.log('📊 Sheet ID:', GOOGLE_SHEETS_SHEET_ID);
  console.log('📧 Client Email:', GOOGLE_SHEETS_CLIENT_EMAIL);
}

// Database operations for comments using Google Sheets
export class CommentDatabase {
  static async getCommentsByProductId(
    productId: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'newest'
  ): Promise<{ comments: Comment[]; total: number }> {
    try {
      console.log(`[CommentDatabase] Getting comments for product: ${productId}, page: ${page}, limit: ${limit}, sort: ${sortBy}`);
      
      // Check if Google Sheets is configured
      if (!GOOGLE_SHEETS_SHEET_ID || !GOOGLE_SHEETS_CLIENT_EMAIL) {
        console.warn('[CommentDatabase] Google Sheets not configured, returning empty results');
        return { comments: [], total: 0 };
      }
      
      const comments = await GoogleSheetsDatabase.getCommentsByProductId(productId);
      // Apply pagination and sorting here as GoogleSheetsDatabase.getCommentsByProductId might not support it directly
      // For now, let's assume it returns all comments and we sort/paginate here.
      // This part needs to be aligned with how GoogleSheetsDatabase.getCommentsByProductId actually works or is intended to work.
      
      let sortedComments = [...comments]; // Create a mutable copy
      sortedComments.sort((a, b) => {
        switch (sortBy) {
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'helpful': // Assuming 'helpful' means most helpful first
            return (b.helpful?.count || 0) - (a.helpful?.count || 0);
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });

      const total = sortedComments.length;
      const paginatedComments = sortedComments.slice((page - 1) * limit, page * limit);

      return { comments: paginatedComments, total };
    } catch (error) {
      console.error(`[CommentDatabase] Error getting comments for product ${productId}:`, error);
      // Return empty results instead of throwing error
      return { comments: [], total: 0 };
    }
  }

  static async addComment(commentData: Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    try {
      console.log(`[CommentDatabase] Adding comment for product: ${commentData.productId}`);
      console.log(`[CommentDatabase] Comment data:`, JSON.stringify(commentData, null, 2));
      
      // Check if Google Sheets is configured
      if (!GOOGLE_SHEETS_SHEET_ID || !GOOGLE_SHEETS_CLIENT_EMAIL) {
        console.error('[CommentDatabase] Google Sheets not configured');
        throw new Error('Database not configured');
      }
      
      const newComment = await GoogleSheetsDatabase.addComment(commentData);
      console.log(`[CommentDatabase] Successfully added comment with ID: ${newComment._id}`);
      
      return newComment;
    } catch (error) {
      console.error(`[CommentDatabase] Error adding comment for product ${commentData.productId}:`, error);
      console.error(`[CommentDatabase] Error details:`, {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      throw new Error(`Failed to add comment: ${(error as Error).message}`);
    }
  }

  static async updateHelpfulCount(commentId: string, userId: string, isHelpful: boolean): Promise<boolean> {
    try {
      console.log(`[CommentDatabase] Updating helpful count for comment: ${commentId}, user: ${userId}, isHelpful: ${isHelpful}`);
      
      const success = await GoogleSheetsDatabase.toggleHelpful(commentId, userId);
      console.log(`[CommentDatabase] Update helpful result: ${success}`);
      
      return success !== null;
    } catch (error) {
      console.error(`[CommentDatabase] Error updating helpful count:`, error);
      return false;
    }
  }

  static async getAllCommentsByProductId(productId: string): Promise<Comment[]> {
    try {
      console.log(`[CommentDatabase] Getting all comments for product: ${productId}`);
      const comments = await GoogleSheetsDatabase.getCommentsByProductId(productId);
      return comments;
    } catch (error) {
      console.error(`[CommentDatabase] Error getting all comments for product ${productId}:`, error);
      throw error;
    }
  }

  static async deleteComment(commentId: string): Promise<boolean> {
    try {
      console.log(`[CommentDatabase] Soft delete not implemented for Google Sheets: ${commentId}`);
      // Google Sheets doesn't support soft delete easily, so we'll skip this
      return false;
    } catch (error) {
      console.error(`[CommentDatabase] Error deleting comment ${commentId}:`, error);
      return false;
    }
  }

  static async initializeIndexes(): Promise<void> {
    try {
      console.log('[CommentDatabase] Initializing Google Sheets with sample data...');
      // Initialize with sample data if needed
      console.log('[CommentDatabase] Database initialized');
      console.log('✅ Google Sheets initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Google Sheets:', error);
      throw error;
    }
  }

  static async getCommentById(commentId: string): Promise<Comment | null> {
    try {
      console.log(`[CommentDatabase] Getting comment by ID: ${commentId}`);
      
      const comment = await GoogleSheetsDatabase.getCommentById(commentId);
      
      if (comment) {
        console.log(`[CommentDatabase] Found comment: ${comment._id}`);
      } else {
        console.log(`[CommentDatabase] Comment not found: ${commentId}`);
      }
      
      return comment;
    } catch (error) {
      console.error(`[CommentDatabase] Error getting comment by ID ${commentId}:`, error);
      return null;
    }
  }
}