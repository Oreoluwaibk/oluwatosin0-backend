import { config } from "dotenv";
import { sign, verify } from "jsonwebtoken";

config();

const privateKey = process.env.JWT_SECRET;
export const createToken = (user: any) => {
    const token =  sign({...user}, privateKey as any, { expiresIn: "30d" })

    return token;
}

export const verifyToken = (token: any) => {
    try {
        const isVerified = verify(token, privateKey as any);
        return isVerified;
    } catch (error) {
        throw new Error("Invalid Token...")
    }
}


