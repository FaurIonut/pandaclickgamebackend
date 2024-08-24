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
const express_1 = __importDefault(require("express"));
const Vibe_1 = __importDefault(require("../../models/Vibe"));
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vibe_new = new Vibe_1.default({
        username: req.body.username,
    });
    try {
        let vibe_check = yield Vibe_1.default.findOne({ username: req.body.username });
        if (vibe_check) {
            return res.json(vibe_check);
        }
        else {
            yield vibe_new.save();
            res.json(vibe_new);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.post("/updateVibe/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vibe = yield Vibe_1.default.findOne({ username: req.params.username });
    if (vibe) {
        const updated_vibe = yield Vibe_1.default.findOneAndUpdate({ username: req.params.username }, { vibe_date: req.body.vibe_date }, { new: true } // Ensure the returned document is the updated one
        );
        if (updated_vibe) {
            const return_vibe = {
                _id: updated_vibe._id,
                username: updated_vibe.username,
                message: updated_vibe.message,
                vibe_date: updated_vibe.vibe_date
            };
            return res.status(200).json(return_vibe);
        }
        else {
            return res.status(400).json({ msg: "Failed to update vibe" });
        }
    }
    else {
        return res.status(400).json({ msg: "You have no vibe" });
    }
}));
router.post("/updateMessage/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vibe = yield Vibe_1.default.findOne({ username: req.params.username });
    if (vibe) {
        const updated_vibe = yield Vibe_1.default.findOneAndUpdate({ username: req.params.username }, { message: req.body.message }, { new: true } // Ensure the returned document is the updated one
        );
        if (updated_vibe) {
            const return_vibe = {
                _id: updated_vibe._id,
                username: updated_vibe.username,
                message: updated_vibe.message,
                vibe_date: updated_vibe.vibe_date
            };
            return res.status(200).json(return_vibe);
        }
        else {
            return res.status(400).json({ msg: "Failed to update message" });
        }
    }
    else {
        return res.status(400).json({ msg: "You have no vibe" });
    }
}));
router.post("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vibe = yield Vibe_1.default.find({ username: req.params.username });
    if (vibe.length > 0) {
        res.json(vibe);
    }
    else {
        return res.status(400).json({ msg: "No vibe" });
    }
}));
exports.default = router;
