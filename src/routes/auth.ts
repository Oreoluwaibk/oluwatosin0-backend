import { Request, Response, Router } from "express";
import User from "../schema/userSchema";
import { createToken, resetToken, verifyToken } from "../utils/tokens";
import bcryptjs from "bcryptjs";
import { sendMail } from "../utils/email";


const salt = 10;

const authRouter = Router();

authRouter
.post("/register", async (req: Request, res: Response) => {

    console.log("req", req.body);
    
    try {
        const { first_name, last_name, email, phone_number, password } = req.body;

        const isUser = await User.findOne({
            email: email 
        });

        if(isUser) return res.status(403).send("user already exist, kindly login to continue");

        const hashedPassword = bcryptjs.hashSync(password, salt);

        const userDetails = {first_name, last_name, hashedPassword, email, phone_number};

        const token = createToken(userDetails);

        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });

        await user.save();
        
        res.status(200).json({
            token,
            message: "User created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `unable to create user, ${error}`
        })
    }
    
})
.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email
    });

    if(!user) return res.status(404).json({
        suceess: false, 
        message: "User does not exist, kindly register to continue!"
    });

    const isPasswordCorrect = bcryptjs.compareSync(password, user?.password);

    if(!isPasswordCorrect) return res.status(401).json({success: false, message: "Incorrect password!"});

    const userDetails = {
        first_name: user.first_name, 
        last_name: user.last_name, 
        hashedPassword: user.password, 
        email, 
        phone_number: user.phone_number
    };

    const token = createToken(userDetails);

    res.status(200).json({
        success: true,
        message: "login successful",
        user,
        token
    })
})
.post("/forgot-password", async(req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({
        email
    });

    if(!user) return res.status(404).send("user does not exist!");

    const { first_name, password, phone_number } = user;

    const userDetails = {first_name, password, email, phone_number};

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
        resetToken: token
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


export default authRouter;