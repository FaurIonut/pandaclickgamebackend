"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Earnings_1 = __importDefault(require("../../models/Earnings"));
const router = express_1.default.Router();
router.post('/add', async (req, res) => {
    const newUser = new Earnings_1.default({
        username: req.body.username,
    });
    try {
        let username_check = await Earnings_1.default.findOne({ username: req.body.username });
        if (username_check) {
            return res.json(username_check);
        }
        else {
            await newUser.save();
            res.json(newUser);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
router.post("/update/joinTelegram/:username", async (req, res) => {
    const user = await Earnings_1.default.findOne({ username: req.params.username });
    if (user) {
        if (user.joinTelegram.status === "Unclaimed") {
        }
        const updated_user = await Earnings_1.default.findOneAndUpdate({ username: req.params.username }, { "joinTelegram.status": req.body.status, "joinTelegram.earned": req.body.earned });
        return res.status(200).json({ msg: "Update successfully!" });
    }
    else {
        return res.status(400).json({ msg: "You have no permission" });
    }
});
router.post("/update/subscribeTelegram/:username", async (req, res) => {
    const user = await Earnings_1.default.findOne({ username: req.params.username });
    if (user) {
        const updated_user = await Earnings_1.default.findOneAndUpdate({ username: req.params.username }, { "subscribeTelegram.status": req.body.status, "subscribeTelegram.earned": req.body.earned });
        return res.status(200).json({ msg: "Update successfully!" });
    }
    else {
        return res.status(400).json({ msg: "You have no permission" });
    }
});
router.post("/update/followTwitter/:username", async (req, res) => {
    const user = await Earnings_1.default.findOne({ username: req.params.username });
    if (user) {
        const updated_user = await Earnings_1.default.findOneAndUpdate({ username: req.params.username }, { "followTwitter.status": req.body.status, "followTwitter.earned": req.body.earned });
        return res.status(200).json({ msg: "Update successfully!" });
    }
    else {
        return res.status(400).json({ msg: "You have no permission" });
    }
});
router.post("/:username", async (req, res) => {
    let user = await Earnings_1.default.findOne({ username: req.params.username });
    if (user) {
        res.json(user);
    }
    else {
        return res.status(400).json({ msg: "You not found" });
    }
});
exports.default = router;
