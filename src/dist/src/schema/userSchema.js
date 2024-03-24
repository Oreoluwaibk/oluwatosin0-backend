"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fisrt_name: { required: true, type: String },
    last_name: { required: true, type: String },
    phone_number: { required: true, type: Number },
    picture: { required: false, type: String },
    address_line1: { required: true, type: String },
    address_line2: { required: false, type: String },
    postal_code: { required: false, type: String },
    state: { required: false, type: String },
    country: { required: false, type: String },
    email: { required: true, type: String },
    date_of_birth: { required: true, type: Date },
    sex: { required: true, type: String },
    user_type: { required: true, type: String, default: "user" }
}, { timestamps: true });
exports.userSchema = userSchema;
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
