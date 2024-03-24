import { Request, Response, Router } from "express";
import User from "../schema/userSchema";
import { createToken, resetToken, verifyToken } from "../utils/tokens";
import bcryptjs from "bcryptjs";
import { sendMail } from "../utils/email";


const salt = 10;

const router = Router();

router
.post("/register", async(req: Request, res: Response) => {
    const { fisrt_name, last_name, email, phone_number, password } = req.body;

    const isUser = await User.findOne({
        email: email 
    });

    if(isUser) return res.status(403).send("user already exist, kindly login to continue");

    const hashedPassword = bcryptjs.hashSync(password, salt);

    const userDetails = {fisrt_name, last_name, hashedPassword, email, phone_number};

    const token = createToken(userDetails);

    const user = await User.create({
        ...req.body,
        password: hashedPassword
    });

    await user.save();
    
    res.send(200).json({
        token,
        message: "User created successfully",
        user
    })
})
.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email
    });

    if(!user) return res.status(404).send("User does not exist, kindly register to continue!");

    const isPasswordCorrect = bcryptjs.compareSync(password, user?.password);

    if(!isPasswordCorrect) return res.status(401).send("Incorrect password!");

    res.status(200).json({
        success: true,
        message: "login successful",
        user
    })
})
.post("/forgot-password", async(req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({
        email
    });

    if(!user) return res.status(404).send("user does not exist!");

    const { fisrt_name, password, phone_number } = user;

    const userDetails = {fisrt_name, password, email, phone_number};

    const token = resetToken(userDetails);

    user.resetToken = token;

    await user.save();

    sendMail({ email, token })
    .then((res) => {
        console.log("re", res);
        
    })
    .catch((err) => {
        console.log("er",err);
        
    })


})
.post("/reset-password/:token", async(req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const isVerified = verifyToken(token);

    if(!isVerified) return res.status(401).json({
        message: "invalid token"
    });

    const user = await User.findOne({
        resetToken: isVerified
    });

    const hashedPassword = bcryptjs.hashSync(password, salt);

    user.password = hashedPassword;
    user.resetToken = "";

    await user.save();

    res.status(200).json({
        success: true,
        message: "password reset successful"
    })
})