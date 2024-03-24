"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema_1 = require("./productSchema");
const orderSchema = new mongoose_1.Schema({
    order_Id: { required: true, type: String },
    total: { required: true, type: Number },
    status: { required: true, type: String, default: "unpaid" },
    customer: {
        name: { required: true, type: String },
        email: { required: true, type: String },
        phone_number: { required: true, type: Number },
        sex: { required: true, type: String }
    },
    items: [
        { required: true, type: productSchema_1.productSchema }
    ],
    delivery_address: { required: true, type: String },
    postal_code: { required: true, type: String },
    state: { required: true, type: String },
    country: { required: true, type: String }
}, { timestamps: true });
const Order = (0, mongoose_1.model)("order", orderSchema);
exports.default = Order;
