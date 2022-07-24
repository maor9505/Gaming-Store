import { Router } from "express";
import {getProducts } from "../controllers/products.js";


const productRouter = Router();

//get all products
productRouter.get("/getProducts", getProducts);



export default productRouter;
