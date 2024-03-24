"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { required: true, type: String },
    price: { required: true, type: Number },
    images: { required: false, type: [] },
    quantity: { required: true, type: Number },
    variants: { required: false, type: [] },
    has_variant: { required: true, type: Boolean, default: false },
    description: { required: true, type: String },
    category: { required: true, type: String }
}, { timestamps: true });
exports.productSchema = productSchema;
const Products = (0, mongoose_1.model)("products", productSchema);
exports.default = Products;
