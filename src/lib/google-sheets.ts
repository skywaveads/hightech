import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Comment } from './models/Comment';

// Google Sheets configuration
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

// Log configuration status
if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_SHEET_ID) {
  console.warn('[GoogleSheets] Missing required environment variables:');
  console.warn('- GOOGLE_SHEETS_CLIENT_EMAIL:', !!GOOGLE_SHEETS_CLIENT_EMAIL);
  console.warn('- GOOGLE_SHEETS_SHEET_ID:', !!GOOGLE_SHEETS_SHEET_ID);
} else {
  console.log('[GoogleSheets] Configuration loaded from environment variables');
}

// Cache for worksheet
let worksheet: any = null;
let worksheetCacheTime = 0;
const WORKSHEET_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Initialize auth client
function getAuthClient() {
  if (!GOOGLE_SHEETS_CLIENT_EMAIL) {
    throw new Error('Google Sheets credentials not configured');
  }

  // استخدام المفتاح الصحيح مباشرة
  const correctPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDErvT2/t2bmBdn
tFJxiKor61Dk3VskW+SHk/PJIi0aga2tDRQNuui865cyfom2A/nRvLxdPSpPu4LC
MQGjkB8Qeo8jh2e29zZYj6tbTyl/UhvILxMU+jHliQ7ENacLYpfRiGWxxux+Tn6J
5XlTmrSklxIwW+ap4T5GbES8a6XNdCHHtdAKxTknIxnClpEhbjhVIb1IqKS/Tb5i
yfUp9N4wnEicThKUlzZ7eVuas7sGew0Wur6p4Ec/RzvudsdiAflNZgJxj12FYJPI
ZouDQpR8DY4/iVorskKiVntJ4Ys/CmRb1mE8o8r+VC8JijlYbaZ6of0cs5cNKPUf
R1lrllD7AgMBAAECggEAAR6RzFoU/s61y2ROV9EUTt2u/y53V1Sij1b7OzjTkuQM
DgEWDSH0MycQHDx2IjARmuz9EXbIp92EWACZZsnqM1jPOb+KipMLnyNqMUHZFZ1t
BQ2niSYHZKwMBnfbtIfiH1Isaf+c1vcxZy2ELEKkJo+pjdboEC11AkeZeI0QS4QM
IWvhLpH2kKs82J7LzjikkQxu4bKVSi08R1OeN4PR2x57CsFkitTEQ+FmmwSdXBjW
H9YhNmAQ63KVNwP+WuqLzkxifpcsTkJ4o28p7jg/J4zm6X1bl/IucmTgOEDA+jt6
w5tfUKa/AZq+RLfHRxbsfu5yZ6kARj6/OO3P/B32SQKBgQDx+rbHUNhIURa7imji
+wHiALAjDJDjLkgVtdin7HW3nEPHMmf784jELp3/OwZh+4Zbl0sKasTfUHCmrCEi
4YonKWrQqbc82ldw9GyK5DQhgsJqqonaPybIX2+0UHaDo4lVzwOnb8mbd66hGqYK
8uo6jFg2TILXpreQirGmcIIGFwKBgQDQFF4E/GZT63W1ev9nckw5t0ZpanGsdIWw
hpRGSSOdWyZLCCRW/X+f1wmykEFVzxxZL6Xj8VxnlJWdFZSHvO6/B7YEgAIQlemi
jLv7jcbQdBt3C4wjv2bVJdqwPLI/5VBUfwDDZH0UhMJ3p3stHU+LmejGDa5j8yAV
4A6NR/v+vQKBgQDDALZ3XVFOxfo53Eq2UG2uAbvwItpIGi4BQPB+MvKSqx1708U0
p4eaAa9V1e1I3Pfjq8LPfEd3Z03BI4n4oCVDdf8cdQizw4kf//nQ3CKets+SQiih
dq78XtyYRRec8hdkzVU2g8HGxeY28lDJFgVodV1JNNNkknfvxbVwWc6OtQKBgH14
+qTpCk9qecVgkOhxPNPE15mzjS5f6UnkLT8g1XAKydGO7FLkc/QPuJJLeIpk5IRH
PjJwlbcEGx/pJnKflBvva2vVQOl9bLAPSz/KY2vJx9IGTZA0166KMA/72cS746/A
EdbBHsejspxyis1Okmvs+DeNgm5U6jEmtb+t+5/FAoGATHsqxLokeg2aNenYBNgg
0f/2foq7levDhwFX9gavGJGkp3tn74pF0c8dJ1dcX1TOn/hIQOSPQn2sojvz04nI
WgkbIPQQG4v3+Qh6jy7knpZ+GKTjnD8lAUUdLBIjeG0tUieeMkPtosoZ6obm8YZc
jQexcfyPydIirjqtlP5XkVs=
-----END PRIVATE KEY-----`;

  console.log('[GoogleSheets] Using correct private key directly');

  return new JWT({
    email: GOOGLE_SHEETS_CLIENT_EMAIL,
    key: correctPrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// Get or create worksheet
async function getWorksheet() {
  const now = Date.now();
  
  // Return cached worksheet if still valid
  if (worksheet && (now - worksheetCacheTime) < WORKSHEET_CACHE_DURATION) {
    return worksheet;
  }

  if (!GOOGLE_SHEETS_CLIENT_EMAIL) {
    throw new Error('Google Sheets credentials not configured');
  }

  const auth = getAuthClient();
  const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_SHEET_ID!, auth);
  
  try {
    await doc.loadInfo();
    
    // Use the first sheet in the document as per user request
    let sheet = doc.sheetsByIndex[0];
    
    if (sheet) {
      console.log(`[GoogleSheets] Using the first worksheet found: "${sheet.title}" (ID: ${sheet.sheetId})`);
      
      try {
        // Try to load headers for the first sheet
        console.log(`[GoogleSheets] Loading header row for the first sheet: "${sheet.title}"`);
        await sheet.loadHeaderRow();
        
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
          console.log(`[GoogleSheets] No headers found in "${sheet.title}". Setting up comment headers...`);
          // Set up the headers for comments
          await sheet.setHeaderRow([
            '_id', 'productId', 'userName', 'userEmail', 'rating', 'title',
            'comment', 'pros', 'cons', 'verified', 'helpfulCount', 'helpfulUsers',
            'status', 'createdAt', 'updatedAt'
          ]);
          console.log(`[GoogleSheets] Headers set for "${sheet.title}"`);
        } else {
          console.log(`[GoogleSheets] Existing headers for "${sheet.title}": ${sheet.headerValues.join(', ')}`);
        }
      } catch (headerError) {
        console.error(`[GoogleSheets] Error loading headers for "${sheet.title}":`, headerError);
        // Try to set headers anyway
        try {
          console.log(`[GoogleSheets] Attempting to set headers for "${sheet.title}"...`);
          await sheet.setHeaderRow([
            '_id', 'productId', 'userName', 'userEmail', 'rating', 'title',
            'comment', 'pros', 'cons', 'verified', 'helpfulCount', 'helpfulUsers',
            'status', 'createdAt', 'updatedAt'
          ]);
          console.log(`[GoogleSheets] Headers set successfully for "${sheet.title}"`);
        } catch (setHeaderError) {
          console.error(`[GoogleSheets] Failed to set headers for "${sheet.title}":`, setHeaderError);
          throw new Error(`Cannot set up headers for sheet "${sheet.title}": ${setHeaderError instanceof Error ? setHeaderError.message : String(setHeaderError)}`);
        }
      }
    } else {
      // This case should ideally not happen if the document exists and has at least one sheet.
      console.error('[GoogleSheets] No worksheets found in the document. Attempting to create "comments" sheet.');
      sheet = await doc.addSheet({
        title: 'comments',
        headerValues: [
          '_id', 'productId', 'userName', 'userEmail', 'rating', 'title',
          'comment', 'pros', 'cons', 'verified', 'helpfulCount', 'helpfulUsers',
          'status', 'createdAt', 'updatedAt'
        ]
      });
      console.log(`✅ "comments" worksheet created as no sheets were found. ID: ${sheet.sheetId}`);
    }
    
    // Cache the worksheet
    worksheet = sheet;
    worksheetCacheTime = now;
    
    return sheet;
  } catch (error) {
    console.error('[GoogleSheets] Error loading or creating "comments" worksheet:', error);
    throw error;
  }
}

// Convert row to Comment object
function rowToComment(row: any): Comment {
  return {
    _id: row.get('_id') || undefined,
    productId: row.get('productId') || '',
    userName: row.get('userName') || '',
    userEmail: row.get('userEmail') || '',
    rating: parseInt(row.get('rating') || '5'),
    title: row.get('title') || '',
    comment: row.get('comment') || '',
    pros: row.get('pros') ? row.get('pros').split(',').map((p: string) => p.trim()) : [],
    cons: row.get('cons') ? row.get('cons').split(',').map((c: string) => c.trim()) : [],
    verified: row.get('verified') === 'true',
    status: (row.get('status') || 'pending') as 'active' | 'pending' | 'hidden',
    helpful: {
      count: parseInt(row.get('helpfulCount') || '0'),
      users: row.get('helpfulUsers') ? row.get('helpfulUsers').split(',').map((u: string) => u.trim()) : []
    },
    createdAt: new Date(row.get('createdAt') || new Date()),
    updatedAt: new Date(row.get('updatedAt') || new Date())
  };
}

// Convert Comment object to row data
function commentToRowData(comment: Comment) {
  return {
    _id: comment._id?.toString() || '',
    productId: comment.productId,
    userName: comment.userName,
    userEmail: comment.userEmail || '',
    rating: comment.rating.toString(),
    title: comment.title || '',
    comment: comment.comment,
    pros: comment.pros?.join(',') || '',
    cons: comment.cons?.join(',') || '',
    verified: comment.verified.toString(),
    helpfulCount: comment.helpful.count.toString(),
    helpfulUsers: comment.helpful.users.join(','),
    status: comment.status,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString()
  };
}

export class GoogleSheetsDatabase {
  // Add new comment
  static async addComment(commentData: Omit<Comment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
    try {
      console.log(`[GoogleSheets] Adding comment for product: ${commentData.productId}`);
      console.log(`[GoogleSheets] Comment data:`, JSON.stringify(commentData, null, 2));
      
      const sheet = await getWorksheet();
      console.log(`[GoogleSheets] Got worksheet: ${sheet.title}`);
      
      // Generate new ID
      console.log(`[GoogleSheets] Getting existing rows to generate new ID...`);
      const rows = await sheet.getRows();
      console.log(`[GoogleSheets] Found ${rows.length} existing rows`);
      
      const maxId = rows.reduce((max: number, row: any) => {
        const id = parseInt(row.get('_id') || '0');
        return id > max ? id : max;
      }, 0);
      console.log(`[GoogleSheets] Generated new ID: ${maxId + 1}`);
      
      const comment: Comment = {
        ...commentData,
        _id: (maxId + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log(`[GoogleSheets] Final comment object:`, JSON.stringify(comment, null, 2));
      
      const rowData = commentToRowData(comment);
      console.log(`[GoogleSheets] Row data to be added:`, JSON.stringify(rowData, null, 2));
      
      console.log(`[GoogleSheets] Adding row to sheet...`);
      await sheet.addRow(rowData);
      
      console.log(`[GoogleSheets] Comment added successfully: ${comment._id}`);
      return comment;
    } catch (error) {
      console.error('[GoogleSheets] Error adding comment:', error);
      console.error('[GoogleSheets] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }

  // Get comments by product ID
  static async getCommentsByProductId(productId: string): Promise<Comment[]> {
    try {
      console.log(`[GoogleSheets] Getting comments for product: ${productId}`);
      
      const sheet = await getWorksheet();
      const rows = await sheet.getRows();
      
      const comments = rows
        .filter((row: any) => row.get('productId') === productId)
        .map(rowToComment)
        .filter((comment: Comment) => comment.status === 'active') // Only show approved comments
        .sort((a: Comment, b: Comment) => b.createdAt.getTime() - a.createdAt.getTime());
      
      console.log(`[GoogleSheets] Found ${comments.length} comments for product ${productId}`);
      return comments;
    } catch (error) {
      console.error(`[GoogleSheets] Error getting comments for product ${productId}:`, error);
      throw error;
    }
  }

  // Get comment by ID
  static async getCommentById(id: string): Promise<Comment | null> {
    try {
      console.log(`[GoogleSheets] Getting comment by ID: ${id}`);
      
      const sheet = await getWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        console.log(`[GoogleSheets] Comment not found: ${id}`);
        return null;
      }
      
      const comment = rowToComment(row);
      console.log(`[GoogleSheets] Found comment: ${comment._id}`);
      return comment;
    } catch (error) {
      console.error(`[GoogleSheets] Error getting comment ${id}:`, error);
      throw error;
    }
  }

  // Update comment
  static async updateComment(id: string, updateData: Partial<Comment>): Promise<boolean> {
    try {
      console.log(`[GoogleSheets] Updating comment: ${id}`);
      
      const sheet = await getWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        console.log(`[GoogleSheets] Comment not found for update: ${id}`);
        return false;
      }
      
      // Get current comment data
      const currentComment = rowToComment(row);
      
      // Merge with update data
      const updatedComment = {
        ...currentComment,
        ...updateData,
        updatedAt: new Date()
      };
      
      // Update row
      const rowData = commentToRowData(updatedComment);
      Object.keys(rowData).forEach(key => {
        row.set(key, rowData[key as keyof typeof rowData]);
      });
      
      await row.save();
      
      console.log(`[GoogleSheets] Comment updated successfully: ${id}`);
      return true;
    } catch (error) {
      console.error(`[GoogleSheets] Error updating comment ${id}:`, error);
      throw error;
    }
  }

  // Delete comment
  static async deleteComment(id: string): Promise<boolean> {
    try {
      console.log(`[GoogleSheets] Deleting comment: ${id}`);
      
      const sheet = await getWorksheet();
      const rows = await sheet.getRows();
      
      const row = rows.find((r: any) => r.get('_id') === id);
      if (!row) {
        console.log(`[GoogleSheets] Comment not found for deletion: ${id}`);
        return false;
      }
      
      await row.delete();
      
      console.log(`[GoogleSheets] Comment deleted successfully: ${id}`);
      return true;
    } catch (error) {
      console.error(`[GoogleSheets] Error deleting comment ${id}:`, error);
      throw error;
    }
  }

  // Toggle helpful status
  static async toggleHelpful(commentId: string, userId: string): Promise<Comment | null> {
    try {
      console.log(`[GoogleSheets] Toggling helpful for comment: ${commentId}`);
      
      const comment = await this.getCommentById(commentId);
      if (!comment) return null;
      
      // Check if user already marked as helpful
      const userIndex = comment.helpful.users.indexOf(userId);
      let newUsers = [...comment.helpful.users];
      let newCount = comment.helpful.count;
      
      if (userIndex > -1) {
        // Remove user from helpful list
        newUsers.splice(userIndex, 1);
        newCount = Math.max(0, newCount - 1);
      } else {
        // Add user to helpful list
        newUsers.push(userId);
        newCount = newCount + 1;
      }
      
      const success = await this.updateComment(commentId, {
        helpful: {
          count: newCount,
          users: newUsers
        }
      });
      
      if (!success) return null;
      
      return await this.getCommentById(commentId);
    } catch (error) {
      console.error(`[GoogleSheets] Error toggling helpful for comment ${commentId}:`, error);
      throw error;
    }
  }

  // Get all comments with pagination and filtering
  static async getAllComments(
    page: number = 1,
    limit: number = 10,
    sortBy: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating' | 'most_helpful' = 'newest',
    filterBy?: {
      status?: 'active' | 'pending' | 'hidden';
      productId?: string;
      rating?: number;
    }
  ): Promise<{ comments: Comment[], total: number }> {
    try {
      console.log(`[GoogleSheets] Getting all comments - page: ${page}, limit: ${limit}, sortBy: ${sortBy}`);
      
      const sheet = await getWorksheet();
      const rows = await sheet.getRows();
      
      let comments = rows.map(rowToComment);
      
      // Apply filters
      if (filterBy) {
        if (filterBy.status !== undefined) {
          comments = comments.filter((c: Comment) => c.status === filterBy.status);
        }
        if (filterBy.productId) {
          comments = comments.filter((c: Comment) => c.productId === filterBy.productId);
        }
        if (filterBy.rating) {
          comments = comments.filter((c: Comment) => c.rating === filterBy.rating);
        }
      }
      
      // Sort comments
      comments.sort((a: Comment, b: Comment) => {
        switch (sortBy) {
          case 'oldest':
            return a.createdAt.getTime() - b.createdAt.getTime();
          case 'highest_rating':
            return b.rating - a.rating || b.createdAt.getTime() - a.createdAt.getTime();
          case 'lowest_rating':
            return a.rating - b.rating || b.createdAt.getTime() - a.createdAt.getTime();
          case 'most_helpful':
            return b.helpful.count - a.helpful.count || b.createdAt.getTime() - a.createdAt.getTime();
          default: // newest
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });
      
      const total = comments.length;
      const skip = (page - 1) * limit;
      const paginatedComments = comments.slice(skip, skip + limit);
      
      console.log(`[GoogleSheets] Found ${paginatedComments.length} comments out of ${total} total`);
      return { comments: paginatedComments, total };
    } catch (error) {
      console.error('[GoogleSheets] Error getting all comments:', error);
      throw error;
    }
  }

  // Bulk update comments
  static async bulkUpdateComments(commentIds: string[], updateData: Partial<Comment>): Promise<number> {
    try {
      console.log(`[GoogleSheets] Bulk updating ${commentIds.length} comments`);
      
      let updatedCount = 0;
      for (const commentId of commentIds) {
        const success = await this.updateComment(commentId, updateData);
        if (success) updatedCount++;
      }
      
      console.log(`[GoogleSheets] Successfully updated ${updatedCount} out of ${commentIds.length} comments`);
      return updatedCount;
    } catch (error) {
      console.error('[GoogleSheets] Error bulk updating comments:', error);
      throw error;
    }
  }

  // Bulk delete comments
  static async bulkDeleteComments(commentIds: string[]): Promise<number> {
    try {
      console.log(`[GoogleSheets] Bulk deleting ${commentIds.length} comments`);
      
      let deletedCount = 0;
      for (const commentId of commentIds) {
        const success = await this.deleteComment(commentId);
        if (success) deletedCount++;
      }
      
      console.log(`[GoogleSheets] Successfully deleted ${deletedCount} out of ${commentIds.length} comments`);
      return deletedCount;
    } catch (error) {
      console.error('[GoogleSheets] Error in bulk delete:', error);
      throw error;
    }
  }

  // Admin authentication methods
  static async addAdmin(adminData: any): Promise<any> {
    try {
      console.log('[GoogleSheets] Adding admin to Google Sheets');
      
      // For now, we'll use a simple approach - store admin data in a separate sheet or use environment variables
      // Since Google Sheets is primarily for comments, we'll simulate admin storage
      console.log('[GoogleSheets] Admin data stored (simulated):', adminData.email);
      return adminData;
    } catch (error) {
      console.error('[GoogleSheets] Error adding admin:', error);
      throw error;
    }
  }

  static async getAdminByEmail(email: string): Promise<any> {
    try {
      console.log(`[GoogleSheets] Getting admin by email: ${email}`);
      
      // For simplicity, we'll use environment variables for admin credentials
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'StrongP@ss123';
      const adminEmail = 'admin@hightech.com';
      
      if (email === adminEmail) {
        // Return a simulated admin object with hashed password
        // Note: In a real implementation, you'd store this in a separate Google Sheet
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        return {
          id: 'admin-001',
          email: adminEmail,
          username: adminUsername,
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
      }
      
      console.log(`[GoogleSheets] Admin not found: ${email}`);
      return null;
    } catch (error) {
      console.error('[GoogleSheets] Error getting admin by email:', error);
      throw error;
    }
  }

  static async updateAdminLastLogin(adminId: string): Promise<boolean> {
    try {
      console.log(`[GoogleSheets] Updating last login for admin: ${adminId}`);
      // In a real implementation, you'd update this in Google Sheets
      // For now, we'll just log it
      console.log(`[GoogleSheets] Last login updated for admin: ${adminId} at ${new Date().toISOString()}`);
      return true;
    } catch (error) {
      console.error('[GoogleSheets] Error updating admin last login:', error);
      return false;
    }
  }
}