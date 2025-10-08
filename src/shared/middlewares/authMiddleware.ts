import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT Token is missing.', 401);
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new AppError('JWT Token malformatted.', 401);
    }

    const [scheme, token] = parts;

    if (typeof scheme !== 'string' || !/^Bearer$/i.test(scheme)) {
      throw new AppError('JWT Token malformatted.', 401);
    }

    if (!token) {
      throw new AppError('JWT Token missing.', 401);
    }

    if (!process.env.APP_SECRET) {
      throw new AppError('APP_SECRET is not defined', 500);
    }

    try {
      const decoded = verify(token, process.env.APP_SECRET as Secret) as ITokenPayload;

      request.user = { id: decoded.sub };
      return next();
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError('JWT token has expired.', 401);
      }
      throw new AppError('Invalid JWT Token.', 401);
    }
  }
}
