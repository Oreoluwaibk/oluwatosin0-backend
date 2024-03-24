import { Request, Response, Router } from "express";
import User from "../schema/userSchema";
import { verifyToken } from "../utils/tokens";

const router = Router();

router
.get("/", async(req: Request, res: Response) => {
    const { Authorization } = req.headers;
    
    const verified = verifyToken(Authorization);
    console.log(verified);
    
    if(!verified) return res.status(404).send("Unauthorized!");

    const allUsers = await User.find();

    res.status(200).json({
        success: true,
        users: allUsers 
    })

})
.post("/", async(req: Request, res: Response) => {
    const { Authorization } = req.headers;
    
    const verified = verifyToken(Authorization);
    
    if(!verified) return res.status(404).send("Unauthorized!");

    const user = await User.create({ ...req.body });

    await user.save();

    res.status(200).json({
        success: true,
        message: "User created successfully!"
    });
})
.put("/:id", async(req: Request, res: Response) => {
    const { Authorization } = req.headers;
    const { id } = req.params;
    
    const verified = verifyToken(Authorization);
    
    if(!verified) return res.status(404).send("Unauthorized!");

    const user = await User.findByIdAndUpdate(id, { ...req.body });
    
    await user.save();

    res.status(200).json({
        success: true,
        message: "User updated successfully!"
    });
})
.delete("/:id", async(req: Request, res: Response) => {
    const { Authorization } = req.headers;
    const { id } = req.params;
    
    const verified = verifyToken(Authorization);
    
    if(!verified) return res.status(404).send("Unauthorized!");

    const user = await User.findByIdAndDelete(id);
    
    res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        user
    });
})