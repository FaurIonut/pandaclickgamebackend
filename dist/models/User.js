"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
// Create the User schema
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user', // Set a default role
    },
    status: {
        type: String,
        default: 'active', // Set a default status
    },
    date: {
        type: Date,
        default: Date.now, // Set a default date to now
    },
});
// Add methods to the schema
UserSchema.methods.encryptPassword = function (password) {
    return (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(10));
};
// Add static methods to the schema
UserSchema.statics.findUserDataByEmail = function (email) {
    return this.find({ email }).exec();
};
// Create the model from the schema
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
