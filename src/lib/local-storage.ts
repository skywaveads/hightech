import fs from 'fs';
import path from 'path';
import { Comment } from './models/Comment';

const DATA_DIR = path.join(process.cwd(), 'data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize comments file if it doesn't exist
if (!fs.existsSync(COMMENTS_FILE)) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify([], null, 2));
}

export class LocalCommentStorage {
  private static readComments(): Comment[] {
    try {
      const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
      const comments = JSON.parse(data);
      
      // Convert date strings back to Date objects
      return comments.map((comment: any) => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt)
      }));
    } catch (error) {
      console.error('[LocalStorage] Error reading comments:', error);
      return [];
    }
  }

  private static writeComments(comments: Comment[]): void {
    try {
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
      console.log(`[LocalStorage] Successfully saved ${comments.length} comments to file`);
    } catch (error) {
      console.error('[LocalStorage] Error writing comments:', error);
      throw error;
    }
  }

  static async getCommentsByProductId(
    productId: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'newest'
  ): Promise<{ comments: Comment[]; total: number }> {
    try {
      console.log(`[LocalStorage] Getting comments for product: ${productId}, page: ${page}, limit: ${limit}, sort: ${sortBy}`);
      
      const allComments = this.readComments();
      const productComments = allComments.filter(
        comment => comment.productId === productId && comment.status === 'active'
      );

      // Sort comments
      productComments.sort((a, b) => {
        switch (sortBy) {
          case 'oldest':
            return a.createdAt.getTime() - b.createdAt.getTime();
          case 'highest_rating':
            return b.rating - a.rating || b.createdAt.getTime() - a.createdAt.getTime();
          case 'lowest_rating':
            return a.rating - b.rating || b.createdAt.getTime() - a.createdAt.getTime();
          case 'most_helpful':
            return (b.helpful?.count || 0) - (a.helpful?.count || 0) || b.createdAt.getTime() - a.createdAt.getTime();
          default: // newest
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });

      const total = productComments.length;
      const skip = (page - 1) * limit;
      const paginatedComments = productComments.slice(skip, skip + limit);

      console.log(`[LocalStorage] Found ${paginatedComments.length} comments out of ${total} total for product: ${productId}`);
      return { comments: paginatedComments, total };
    } catch (error) {
      console.error(`[LocalStorage] Error getting comments for product ${productId}:`, error);
      throw error;
    }
  }

  static async addComment(commentData: Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    try {
      console.log(`[LocalStorage] Adding comment for product: ${commentData.productId}`);
      console.log(`[LocalStorage] Comment data:`, JSON.stringify(commentData, null, 2));
      
      const allComments = this.readComments();
      
      const newComment: Comment = {
        ...commentData,
        _id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as any,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      allComments.push(newComment);
      this.writeComments(allComments);

      console.log(`[LocalStorage] Successfully added comment with ID: ${newComment._id}`);
      return newComment;
    } catch (error) {
      console.error(`[LocalStorage] Error adding comment for product ${commentData.productId}:`, error);
      throw error;
    }
  }

  static async getCommentById(commentId: string): Promise<Comment | null> {
    try {
      console.log(`[LocalStorage] Getting comment by ID: ${commentId}`);
      
      const allComments = this.readComments();
      const comment = allComments.find(c => c._id?.toString() === commentId);
      
      if (comment) {
        console.log(`[LocalStorage] Found comment: ${comment._id}`);
      } else {
        console.log(`[LocalStorage] Comment not found: ${commentId}`);
      }
      
      return comment || null;
    } catch (error) {
      console.error(`[LocalStorage] Error getting comment by ID ${commentId}:`, error);
      return null;
    }
  }

  static async updateHelpfulCount(commentId: string, userId: string, isHelpful: boolean): Promise<boolean> {
    try {
      console.log(`[LocalStorage] Updating helpful count for comment: ${commentId}, user: ${userId}, isHelpful: ${isHelpful}`);
      
      const allComments = this.readComments();
      const commentIndex = allComments.findIndex(c => c._id?.toString() === commentId);
      
      if (commentIndex === -1) {
        console.log(`[LocalStorage] Comment not found: ${commentId}`);
        return false;
      }

      const comment = allComments[commentIndex];
      
      // Initialize helpful if it doesn't exist
      if (comment && !comment.helpful) {
        comment.helpful = { count: 0, users: [] };
      }

      if (!comment) {
        return false;
      }

      const userIndex = comment.helpful.users.indexOf(userId);
      
      if (isHelpful) {
        // Add user to helpful list if not already there
        if (userIndex === -1) {
          comment.helpful.users.push(userId);
          comment.helpful.count++;
          comment.updatedAt = new Date();
          
          this.writeComments(allComments);
          console.log(`[LocalStorage] Added helpful vote. New count: ${comment.helpful.count}`);
          return true;
        }
      } else {
        // Remove user from helpful list if they're there
        if (userIndex !== -1) {
          comment.helpful.users.splice(userIndex, 1);
          comment.helpful.count = Math.max(0, comment.helpful.count - 1);
          comment.updatedAt = new Date();
          
          this.writeComments(allComments);
          console.log(`[LocalStorage] Removed helpful vote. New count: ${comment.helpful.count}`);
          return true;
        }
      }
      
      console.log(`[LocalStorage] No change needed for helpful count`);
      return false;
    } catch (error) {
      console.error(`[LocalStorage] Error updating helpful count:`, error);
      return false;
    }
  }

  static async initializeWithSampleData(): Promise<void> {
    try {
      const allComments = this.readComments();
      
      // Only add sample data if no comments exist
      if (allComments.length === 0) {
        console.log('[LocalStorage] Initializing with sample data...');
        
        const sampleComments: Comment[] = [
          {
            _id: 'sample_1' as any,
            productId: 'high-tech-cutter-plotter',
            userName: 'أحمد محمد',
            userEmail: 'ahmed@example.com',
            rating: 5,
            comment: 'منتج ممتاز جداً! جودة القطع عالية والدقة مذهلة. أنصح به بشدة لأي شخص يعمل في مجال الطباعة والتصميم.',
            verified: true,
            helpful: { count: 12, users: ['user1', 'user2', 'user3'] },
            status: 'active',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15')
          },
          {
            _id: 'sample_2' as any,
            productId: 'high-tech-cutter-plotter',
            userName: 'فاطمة علي',
            userEmail: 'fatima@example.com',
            rating: 4,
            comment: 'جهاز رائع وسهل الاستخدام. الوحيد العيب أن الصوت مرتفع قليلاً أثناء العمل، لكن النتائج ممتازة.',
            verified: false,
            helpful: { count: 8, users: ['user4', 'user5'] },
            status: 'active',
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20')
          },
          {
            _id: 'sample_3' as any,
            productId: 'high-tech-cutter-plotter',
            userName: 'محمد السعيد',
            userEmail: 'mohamed@example.com',
            rating: 5,
            comment: 'استخدمه في مشروعي التجاري منذ 6 أشهر. موثوق جداً ولم يتعطل أبداً. خدمة العملاء ممتازة أيضاً.',
            verified: true,
            helpful: { count: 15, users: ['user6', 'user7', 'user8', 'user9'] },
            status: 'active',
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01')
          }
        ];

        this.writeComments(sampleComments);
        console.log('[LocalStorage] Sample data initialized successfully');
      } else {
        console.log(`[LocalStorage] Found ${allComments.length} existing comments, skipping sample data`);
      }
    } catch (error) {
      console.error('[LocalStorage] Error initializing sample data:', error);
    }
  }
}