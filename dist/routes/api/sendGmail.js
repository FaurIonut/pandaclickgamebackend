"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
router.post("/send/:gmail", async (req, res) => {
    const gmail = req.params.gmail;
    const mailTransporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "smart163410@gmail.com",
            pass: "gdobzmpamouonfjg",
        },
    });
    try {
        const res = await mailTransporter.sendMail({
            from: "smart163410@gmail.com",
            to: gmail,
            subject: "Email Verification",
            html: "Invite my performance system website(url: https://perf-sys-frontend.vercel.app/)",
        });
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
