import { Router, Request, Response } from "express";
import checkAuth from "../utils/authorization";
import Products from "../schema/productSchema";

const productRouter = Router();

productRouter
.get("/", async(_, res: Response) => {

    try {
        const products = await Products.find();

        res.status(200).json({
            success: true,
            allProducts: products
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get products, ${error.response}`
        });
    }
})
.get("/:category", async(req: Request, res: Response) => {
    const { category } = req.params;

    try {
        const products = await Products.find({ category });

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to get product by category, ${error.response}`
        });   
    }
})
.post("/", checkAuth, async(req: Request, res:Response) => {
    const { body } = req;

    try {
        const newProduct = await Products.create({...body});

        await newProduct.save();

        res.status(200).json({
            success: true,
            message: "Successfully created new product"
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to create product, ${error.response}`
        });
    }
})
.put("/:id", checkAuth, async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Products.findByIdAndUpdate(id, {...req.body});

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to update product, ${error.response}`
        });
    }
})
.delete("/:id", checkAuth, async(req, res) => {
    const { id } = req.params;

    try {
        await Products.findByIdAndDelete(id);
        
        res.status(201).json({
            success: true,
            message: "Product deleted successfully!"
        })
    } catch (error) {
        res.json({
            success: false,
            message: `Unable to delete product, ${error.response}`
        })
    }
})


export default productRouter;