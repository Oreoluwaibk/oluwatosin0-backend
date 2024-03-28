import { Request, Response, Router } from "express";
import User from "../schema/userSchema";
import { verifyToken } from "../utils/tokens";
import checkAuth from "../utils/authorization";

const userRouter = Router();

userRouter
.get("/", checkAuth, async(req: Request, res: Response) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            users: allUsers 
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get all users, ${error.response}`
        });
    }
})
.post("/", checkAuth, async(req: Request, res: Response) => {
    try {
        const user = await User.create({ ...req.body });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User created successfully!"
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to create user, ${error.response}`
        });
    }
})
.get("/:id", async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get user, ${error.response}`
        });
    }
})
.put("/:id", checkAuth, async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        const user = await User.findByIdAndUpdate(id, { ...req.body });
        
        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully!"
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to update user, ${error.response}`
        });
    }
})
.delete("/:id", checkAuth, async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            user
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get user, ${error.response}`
        });
    }
})

export default userRouter;