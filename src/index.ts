import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
config();
import router from "./routes";
import connectionToDatabase from "./dbconfig/index";
import blogRoute from "./routes/blog";


try {
    const app: Application = express();
    connectionToDatabase();


    app.use("/", router);
    app.use(cors({
        origin: "*"
    }))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/blog", blogRoute)

    app.get("/", async(_, res: Response) => {
        res.send("App is currently running..")
    })


    const PORT = process.env.PORT || 5001;
    console.log("it is working");


    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`);
    })
} catch (error) {
    console.log("server", error);
    
}

