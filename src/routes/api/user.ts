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
      const decodedToken = decoded as jwt.JwtPayload;
      User.findById(decodedToken._id)
        .then((user) => {
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).json({ msg: "User not found" });
          }
        })
        .catch(() => {
          return res.status(401).json({ msg: "Token is not valid" });
        });
    }
  });
}

// Example route with updated checks
export async function someRouteHandler(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const user = await User.findById(req.user._id).select(["-password"]);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    // Continue with the route logic
    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
    res.status(500).json({ msg: "Server error" });
  }
}
