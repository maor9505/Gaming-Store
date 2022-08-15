import { Router } from "express";
import { adminUpdateStatusOrder, cancelOrder, getAdminOrders, getOrderById, getOrders, handleOrderPayment } from "../controllers/order.js";


const orderRouter = Router();

//get all user orders
orderRouter.get("/getOrders", getOrders);
// get order by id
orderRouter.get("/getOrder",getOrderById);
// //cancel order
 orderRouter.post("/cancelOrder", cancelOrder);
//order payment 
orderRouter.post('/orderPayment',handleOrderPayment)
//get admin orders
orderRouter.get("/getAdminOrders", getAdminOrders);
// admin update status  orders
orderRouter.post("/updateAdminOrders", adminUpdateStatusOrder);


export default orderRouter;
