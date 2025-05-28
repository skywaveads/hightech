import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    role: string;
    [key: string]: any;
  }
} 