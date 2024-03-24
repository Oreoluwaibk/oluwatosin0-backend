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
const express_1 = require("express");
const blogSchema_1 = __importDefault(require("../schema/blogSchema"));
const blogRoute = (0, express_1.Router)();
blogRoute
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogSchema_1.default.find();
    console.log("blogs", blogs);
    res.status(200).json({
        success: true,
        blogs
    });
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, image } = req.body.data;
    const { Authorization } = req.headers;
    console.log(title, content, image);
    try {
        const blog = yield blogSchema_1.default.create({
            title,
            content,
            image
        });
        yield blog.save();
        res.status(200).json({
            success: true,
            blog
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "Unable to create blog"
        });
    }
}))
    .post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = req.body;
    try {
        const blog = yield blogSchema_1.default.findById(id);
        yield (blog === null || blog === void 0 ? void 0 : blog.updateOne(Object.assign({}, data)));
        yield (blog === null || blog === void 0 ? void 0 : blog.save());
        res.status(200).json({
            success: true,
            blog
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error || "unable to update blog"
        });
    }
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield blogSchema_1.default.findByIdAndDelete(id);
        res.status(201).json({
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "unable to delete blog"
        });
    }
}));
exports.default = blogRoute;
