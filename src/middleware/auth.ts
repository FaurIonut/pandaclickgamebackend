import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User, { IUser } from "../models/User";

// Define the interface to extend the Request object
interface AuthRequest extends Request {
  user?: IUser; // Use IUser type for user object
}

// Middleware to verify JWT and attach user to request
export default function (req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"] as string | undefined;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: "Token is not valid" });
    } else {
      // Ensure decoded is typed correctly
      const decodedToken = decoded as jwt.JwtPayload;
      User.findById(decodedToken._id)
        .then((user) => {
          if (user) {
            req.user = user;
            next();
          } else {
            return res.status(401).json({ msg: "User not found" });
          }
        })
        .catch(() => {
          return res.status(401).json({ msg: "Token is not valid" });
        });
    }
  });
}
