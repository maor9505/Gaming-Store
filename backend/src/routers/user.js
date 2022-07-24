import { Router } from "express";
import { addUser, signInWithGoogle, updateUser } from "../controllers/user.js";


const userRouter = Router();

//get  user by id
userRouter.get("/getUser");
//signup with google 
userRouter.post("/signInWithGoogle",signInWithGoogle);
// update user
userRouter.post("/updateUser", updateUser);
// add new user to db
userRouter.post("/addUser", addUser);


export default userRouter;
