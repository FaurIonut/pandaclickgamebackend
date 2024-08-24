"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserDataByEmail = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
    }
});
UserSchema.methods.encryptPassword = (password) => (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(10));
const User = (0, mongoose_1.model)("User", UserSchema);
const findUserDataByEmail = async (email_f) => {
    return await User.find({
        email: email_f,
    });
};
exports.findUserDataByEmail = findUserDataByEmail;
exports.default = User;
