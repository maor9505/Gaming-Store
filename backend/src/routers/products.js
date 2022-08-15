import { Router } from "express";
import {addProduct, deleteProduct, editProduct, getProducts } from "../controllers/products.js";




const productRouter = Router();

//get all products
productRouter.get("/getProducts", getProducts);
// productRouter.post("/addProducts", addProduct);
// productRouter.post("/editProducts", editProduct);

productRouter.post("/deleteProduct", deleteProduct);

export default productRouter;
