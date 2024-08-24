import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
    user?: { role: string };
}

export default function(req: RequestWithUser, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ msg: "No user, authorization denied" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" });
    }

    next();
}
