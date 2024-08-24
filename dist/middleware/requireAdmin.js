"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Access denied" }); // Changed status to 403 (Forbidden)
    }
    next();
}
