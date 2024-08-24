import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

interface RequestWithUser extends Express.Request {
    user?: any;
}

export default function(req: RequestWithUser, res: Express.Response, next: Express.NextFunction) {
    const token = req.headers["x-auth-token"];

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        jwt.verify(token, config.jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" });
            }

            // Ensure `decoded` is of type `JwtPayload`
            const payload = decoded as JwtPayload;

            User.findById(payload._id).then(user => {
                if (!user) {
                    return res.status(401).json({ msg: "User not found" });
                }

                req.user = user;
                next();
            }).catch(() => {
                return res.status(401).json({ msg: "Token is not valid" });
            });
        });
    } catch (err) {
        console.error("Something wrong with auth middleware:", err);
        res.status(500).json({ msg: "Server Error" });
    }
}
