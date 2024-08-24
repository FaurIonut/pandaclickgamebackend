"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WalletAddress_1 = __importDefault(require("../../models/WalletAddress"));
const router = express_1.default.Router();
router.post("/add", async (req, res) => {
    const walletAddress_new = new WalletAddress_1.default({
        username: req.body.username,
        address: req.body.address,
        chain: req.body.chain
    });
    try {
        let walletAddress_check = await WalletAddress_1.default.findOne({ address: req.body.address });
        if (walletAddress_check) {
            return res.status(400).json({ msg: "Address is already inserted" });
        }
        else {
            await walletAddress_new.save();
            res.json(walletAddress_new);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.default = router;
