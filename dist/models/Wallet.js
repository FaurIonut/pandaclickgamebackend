"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const WalletSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    energy: {
        type: Number,
        default: 1000
    },
    full_energy: {
        type: Number,
        default: 1
    },
    tap: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 1000
    },
    daily_coins: {
        type: Date,
        default: (0, moment_1.default)()
    },
});
const Wallet = (0, mongoose_1.model)("Wallet", WalletSchema);
exports.default = Wallet;
