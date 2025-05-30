declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    role: string;
    email?: string;
    [key: string]: unknown;
  }

  export function verify(token: string, secretOrPublicKey: string): JwtPayload | string;
  export function sign(payload: object, secretOrPrivateKey: string, options?: any): string;
}