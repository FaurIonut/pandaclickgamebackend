"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
exports.someRouteHandler = someRouteHandler;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("../models/User"));
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
            const decodedToken = decoded;
            User_1.default.findById(decodedToken._id)
                .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                }
                else {
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
function someRouteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({ msg: "User not authenticated" });
            }
            const user = yield User_1.default.findById(req.user._id).select(["-password"]);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            if (req.user.role !== "admin") {
                return res.status(403).json({ msg: "Access denied" });
            }
            // Continue with the route logic
            res.json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                return res.status(500).json({ msg: "Server error" });
            }
            res.status(500).json({ msg: "Server error" });
        }
    });
}
