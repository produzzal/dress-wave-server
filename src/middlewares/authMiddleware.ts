import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request type here
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

// .envからJWT_SECRETを取得
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface IUser {
  id: string;
  role: string;
}

// JWT認証ミドルウェア
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is missing!",
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token!",
        });
      }

      // Attach decoded user to request object
      req.user = decoded as IUser;
      next();
    }
  );
};

export default authMiddleware;
