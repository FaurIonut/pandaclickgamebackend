"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const db = config_1.default.mongoURI;
const connectDB = async () => {
    try {
        mongoose_1.default.connect(db);
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = connectDB;
