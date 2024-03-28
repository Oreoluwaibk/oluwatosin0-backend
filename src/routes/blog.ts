import { Request, Response, Router } from "express";
import Blog from "../schema/blogSchema";
import checkAuth from "../utils/authorization";

const blogRoute = Router();

blogRoute
.get("/", checkAuth, async (_, res: Response) => {

    try {
        const blogs = await Blog.find();
        console.log("blogs", blogs);
        
        res.status(200).json({
            success: true,
            blogs
        })   
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get blogs, ${error}`
        });
    }
})
.post("/", async(req: Request, res: Response) => {
    
    try {
        const { title, content, image } = req.body;
        
        const blog = await Blog.create({
            title,
            content,
            image
        })
    
        await blog.save();

        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: `unable to create blog, ${error}`
        })
    }
    
})
.post("/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const blog = await Blog.findById(id);

        await blog?.updateOne({
            ...data
        });

        await blog?.save()
        
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error || "unable to update blog"
        })
    }

})
.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Blog.findByIdAndDelete(id);

        res.status(201).json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error || "unable to delete blog"
        })
    }
})




export default blogRoute;
