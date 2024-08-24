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
const WalletAddress_1 = __importDefault(require("../../models/WalletAddress"));
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress_new = new WalletAddress_1.default({
        username: req.body.username,
        address: req.body.address,
        chain: req.body.chain
    });
    try {
        let walletAddress_check = yield WalletAddress_1.default.findOne({ address: req.body.address });
        if (walletAddress_check) {
            return res.status(400).json({ msg: "Address is already inserted" });
        }
        else {
            yield walletAddress_new.save();
            res.json(walletAddress_new);
        }
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
exports.default = router;
//# sourceMappingURL=walletAddress.js.map