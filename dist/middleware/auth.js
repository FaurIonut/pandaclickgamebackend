"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
// Middleware to verify JWT and attach user to request
function default_1(req, res, next) {
    const token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: "Token is not valid" });
        }
        else {
            // Ensure decoded is typed correctly
            const decodedToken = decoded;
            User_1.default.findById(decodedToken._id)
                .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    return res.status(401).json({ msg: "User not found" });
                }
            })
                .catch(() => {
                return res.status(401).json({ msg: "Token is not valid" });
            });
        }
    });
}
