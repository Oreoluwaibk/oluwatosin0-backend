import { Schema, model } from "mongoose";

interface IUser {
    first_name: string;
    last_name: string;
    phone_number: number;
    password: string;
    picture?: string;
    address_line1: string;
    address_line2?: string;
    postal_code?: any;
    state: string;
    country: string;
    email: string;
    date_of_birth?: Date;
    sex: "male" | "female" | string;
    user_type: "user" | "admin",
    resetToken: string;
}

const userSchema = new Schema<IUser>({
    first_name: {required: true, type: String},
    last_name: {required: true, type: String},
    phone_number: {required: true, type: Number},
    picture: {required: false, type: String},
    password: {required: true, type: String},
    resetToken: {required: false, type: String},
    address_line1: {required: true, type: String},
    address_line2: {required: false, type: String},
    postal_code: {required: false, type: String},
    state: {required: false, type: String},
    country: {required: false, type: String},
    email: {required: true, type: String},
    date_of_birth: {required: false, type: Date},
    sex: {required: true, type: String},
    user_type: {required: true, type: String, default: "user"}
}, { timestamps: true })

export { userSchema }
const User = model<IUser>("user", userSchema);
export default User;