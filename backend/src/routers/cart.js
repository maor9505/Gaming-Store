import { Router } from "express";
import { addProductToCart, decProductToCart, deleteProductToCart, getCart, incProductToCart } from "../controllers/cart.js";

const cartRouter = Router();

//get all cart
cartRouter.get("/getCart", getCart);
//add product
 cartRouter.post("/addProductToCart", addProductToCart);
 //inc product 
 cartRouter.post("/incProductToCart", incProductToCart);
//dec product
 cartRouter.post("/decProductToCart", decProductToCart);

//delete product
 cartRouter.post("/deleteProductToCart", deleteProductToCart);


 

export default cartRouter;
