import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

// Define the interface to extend the Request object
interface AuthRequest extends Request {
  user?: any; // Adjust this type as needed
}

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
          req.user = user;
          next();
        })
        .catch(() => {
          return res.status(401).json({ msg: "Token is not valid" });
        });
    }
  });
}
