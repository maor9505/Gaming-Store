import { Router } from "express";
import { getCategories,addCategory, deleteCategory } from "../controllers/category.js";

const categoryRouter = Router();

//get all user orders
categoryRouter.get("/getCategories", getCategories);
// get order by id
categoryRouter.post("/addCategory", addCategory);
// delete category
categoryRouter.post("/deleteCategory", deleteCategory);



export default categoryRouter;
