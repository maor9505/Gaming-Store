import express from "express";
import bodyParser from "body-parser";
import productRouter from './routers/products.js';
import cartRouter from "./routers/cart.js";
import orderRouter from "./routers/order.js";
import userRouter from "./routers/user.js";
import categoryRouter from "./routers/category.js";
import cors from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, editProduct } from "./controllers/products.js";

const PORT = process.env.PORT || 3001;
const storage = multer.memoryStorage();

const upload = multer({ storage });
const app = express();
const __dirname = path.resolve();

 app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Methods",
     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
   );
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
 });

  app.use(bodyParser.json()); // application/json
  app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/products/addProducts", upload.array("productImg"),addProduct, (req) => {
  console.log(success)

});
app.use(
  "/products/editProducts",
  upload.array("productImg"),
  editProduct,
  (req) => {
    console.log(success);
  }
);

 app.use("/products", productRouter);
  app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    app.use('/user',userRouter);
     app.use("/category", categoryRouter);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
