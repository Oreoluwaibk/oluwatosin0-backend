"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    }
}, {
    timestamps: true
});
const Blog = (0, mongoose_1.model)("blog", blogSchema);
exports.default = Blog;
