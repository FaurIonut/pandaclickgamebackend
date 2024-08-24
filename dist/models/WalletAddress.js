"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WalletAddressSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    chain: {
        type: String,
        required: true
    }
});
const WalletAddress = (0, mongoose_1.model)("WalletAddress", WalletAddressSchema);
exports.default = WalletAddress;
