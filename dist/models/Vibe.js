"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
// Create the Vibe schema
const VibeSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String, // Changed from Boolean to String for message content
        required: true,
    },
    vibe_date: {
        type: Date,
        default: () => (0, moment_1.default)().subtract(1, 'days').toDate(), // Changed toDate() for Date type
    },
});
// Create the model from the schema
const Vibe = (0, mongoose_1.model)("Vibe", VibeSchema);
exports.default = Vibe;
