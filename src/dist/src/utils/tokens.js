"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
const privateKey = process.env.JWT_SECRET;
const createToken = (user) => {
    const token = (0, jsonwebtoken_1.sign)(Object.assign({}, user), privateKey, { expiresIn: "30d" });
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        const isVerified = (0, jsonwebtoken_1.verify)(token, privateKey);
        return isVerified;
    }
    catch (error) {
        throw new Error("Invalid Token...");
    }
};
exports.verifyToken = verifyToken;
