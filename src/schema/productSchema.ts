import { Schema, model } from "mongoose";

interface IProduct {
    name: string;
    price: number;
    images?: [];
    quantity: number;
    variants?: [];
    has_variant: boolean;
    description: string;
    category: string;
}

const productSchema = new Schema<IProduct>({
    name: {required: true, type: String},
    price: {required: true, type: Number},
    images: {required: false, type: []},
    quantity: {required: true, type: Number},
    variants: {required: false, type: []},
    has_variant: {required: true, type: Boolean, default: false},
    description: {required: true, type: String},
    category: {required: true, type: String}
}, { timestamps: true })

export { productSchema };
const Products = model<IProduct>("products", productSchema);
export default Products;