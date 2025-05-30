import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'g#Pz7@rM!aW^84qL*v2ZxT$kNdYh1sB9';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Verify admin authentication from request
 */
export async function verifyAdmin(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Get token from cookies
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      console.log('[Auth] No admin token found in cookies');
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    
    if (!decoded || !decoded.id || !decoded.email) {
      console.log('[Auth] Invalid token payload');
      return null;
    }

    // Return admin user data
    return {
      id: decoded.id,
      email: decoded.email || '',
      role: decoded.role || 'admin'
    };
  } catch (error) {
    console.error('[Auth] Token verification failed:', error);
    return null;
  }
}

/**
 * Check if request is from authenticated admin
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const admin = await verifyAdmin(request);
  return admin !== null;
}

/**
 * Get admin user from request
 */
export async function getAdminUser(request: NextRequest): Promise<AdminUser | null> {
  return await verifyAdmin(request);
}