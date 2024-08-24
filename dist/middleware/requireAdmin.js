"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    else if (req.user.role !== "admin") {
        return res.status(400).json({ msg: "No token, authorization denied" });
    }
    else {
        next();
    }
}
//# sourceMappingURL=requireAdmin.js.map