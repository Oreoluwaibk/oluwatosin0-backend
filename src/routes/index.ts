import { Request, Response, Router } from "express";
import blogRoute from "./blog";

const router = Router();

router.use("/blog", blogRoute);


export default router;


