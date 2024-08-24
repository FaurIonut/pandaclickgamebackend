"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Friend_1 = __importDefault(require("../../models/Friend"));
const router = express_1.default.Router();
router.post('/add', async (req, res) => {
    const friend_new = new Friend_1.default({
        username: req.body.username,
        friend: req.body.friend
    });
    try {
        let friend_check = await Friend_1.default.findOne({ friend: req.body.friend });
        if (friend_check) {
            return res.status(400).json({ msg: "You are already added in friend item" });
        }
        else {
            await friend_new.save();
            res.json(friend_new);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
router.post("/:username", async (req, res) => {
    let friend = await Friend_1.default.find({ username: req.params.username });
    if (friend) {
        res.json(friend);
    }
    else {
        return res.status(400).json({ msg: "No Friends" });
    }
});
exports.default = router;
