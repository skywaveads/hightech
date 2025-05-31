import { NextRequest } from 'next/server';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Verify admin authentication from request using simple session
 */
export async function verifyAdmin(request: NextRequest): Promise<AdminUser | null> {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      console.log('[Auth] No admin session found in cookies');
      return null;
    }

    // Simple session validation - check if token starts with our prefix
    if (!sessionToken.startsWith('admin-session-')) {
      console.log('[Auth] Invalid session token format');
      return null;
    }

    // Extract timestamp from token
    const timestamp = sessionToken.replace('admin-session-', '');
    const tokenTime = parseInt(timestamp);
    
    // Check if token is not too old (24 hours = 86400000 ms)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (now - tokenTime > maxAge) {
      console.log('[Auth] Session token expired');
      return null;
    }

    console.log('[Auth] ✅ Session validated successfully');
    
    // Return admin user data
    return {
      id: 'admin-001',
      email: 'admin@hightech.com',
      role: 'admin'
    };
  } catch (error) {
    console.error('[Auth] Session verification failed:', error);
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