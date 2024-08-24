import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    role?: string; // Use string instead of null
  };
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" }); // Changed status to 403 (Forbidden)
    }
    next();
}
