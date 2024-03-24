import { Schema, model } from "mongoose";
import { productSchema } from "./productSchema";

interface IOrder {
    order_Id: any;
    total: number;
    status: "pending" | "unpaid" | "paid";
    customer: {
        name: string;
        email: string;
        phone_number: number;
        sex: "male" | "female" | string;
    }
    items: [typeof productSchema];
    delivery_address: string;
    postal_code: string;
    state: string;
    country: string;
}

const orderSchema = new Schema<IOrder>({
    order_Id: {required: true, type: String},
    total: {required: true, type: Number},
    status: {required: true, type: String, default: "unpaid"},
    customer: {
        name: {required: true, type: String},
        email: {required: true, type: String},
        phone_number: {required: true, type: Number},
        sex: {required: true, type: String}
    },
    items: [
        {required: true, type: productSchema}
    ],
    delivery_address: {required: true, type: String},
    postal_code: {required: true, type: String},
    state: {required: true, type: String},
    country: {required: true, type: String}    
}, { timestamps: true })


const Order = model<IOrder>("order", orderSchema);
export default Order;