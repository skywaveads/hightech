declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    role: string;
    [key: string]: unknown;
  }
}