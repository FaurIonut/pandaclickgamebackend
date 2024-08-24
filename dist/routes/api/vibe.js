"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vibe_1 = __importDefault(require("../../models/Vibe"));
const router = express_1.default.Router();
router.post("/add", async (req, res) => {
    const vibe_new = new Vibe_1.default({
        username: req.body.username,
    });
    try {
        let vibe_check = await Vibe_1.default.findOne({ username: req.body.username });
        if (vibe_check) {
            return res.json(vibe_check);
        }
        else {
            await vibe_new.save();
            res.json(vibe_new);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
router.post("/updateVibe/:username", async (req, res) => {
    const vibe = await Vibe_1.default.findOne({ username: req.params.username });
    if (vibe) {
        const updated_vibe = await Vibe_1.default.findOneAndUpdate({ username: req.params.username }, { vibe_date: req.body.vibe_date });
        const return_vibe = {
            _id: updated_vibe._id,
            username: updated_vibe.username,
            message: updated_vibe.message,
            vibe_date: req.body.vibe_date
        };
        return res.status(200).json(return_vibe);
    }
    else {
        return res.status(400).json({ msg: "You have no vibe" });
    }
});
router.post("/updateMessage/:username", async (req, res) => {
    const vibe = await Vibe_1.default.findOne({ username: req.params.username });
    if (vibe) {
        const updated_vibe = await Vibe_1.default.findOneAndUpdate({ username: req.params.username }, { message: req.body.message });
        const return_vibe = {
            _id: updated_vibe._id,
            username: updated_vibe.username,
            message: req.body.message,
            vibe_date: updated_vibe.vibe_date
        };
        return res.status(200).json(return_vibe);
    }
    else {
        return res.status(400).json({ msg: "You have no vibe" });
    }
});
router.post("/:username", async (req, res) => {
    let vibe = await Vibe_1.default.find({ username: req.params.username });
    if (vibe) {
        res.json(vibe);
    }
    else {
        return res.status(400).json({ msg: "No vibe" });
    }
});
exports.default = router;
