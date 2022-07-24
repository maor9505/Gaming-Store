import express from "express";
import bodyParser from "body-parser";
import productRouter from './routers/products.js';
import cartRouter from "./routers/cart.js";
import orderRouter from "./routers/order.js";
import userRouter from "./routers/user.js";
import categoryRouter from "./routers/category.js";
import cors from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

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


 app.use("/products", productRouter);
  app.use("/cart", cartRouter);
    app.use("/order", orderRouter);
    app.use('/user',userRouter);
     app.use("/category", categoryRouter);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
