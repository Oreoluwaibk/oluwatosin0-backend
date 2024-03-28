import { Request, Response, Router } from "express";
import blogRoute from "./blog";
import authRouter from "./auth";
import userRouter from "./user";
import productRouter from "./products";

const router = Router();

router.use("/blog", blogRoute);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);


export default router;


