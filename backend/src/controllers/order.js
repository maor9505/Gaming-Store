import { db } from "../config/Config.js";
import { getOrder } from "../DbModal/Order.js";

export const getOrders = async (req, res, next) => {
  const data = [];
  try {
    await db
      .collection("Orders")
      .doc(req.query.uid)
      .collection("OrderList")
      .orderBy("DateCreate", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => data.push(getOrder(doc)));
      })
      .catch((err) => {
        console.log(err);
      });
    res
      .status(200)
      .json({ message: " get All  user orders success", orders: data });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    await db
      .collection("Orders")
      .doc(req.query.uid)
      .collection("OrderList")
      .doc(req.query.orderId)
      .get()
      .then((snapshot) => {
        res.status(200).json({
          message: " get order by id success",
          order: getOrder(snapshot),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    next(err);
  }
};
export const cancelOrder = async (req, res, next) => {
  try {
    await db
      .collection("Orders")
      .doc(req.body.order.UserID)
      .collection("OrderList")
      .doc(req.body.order.ID)
      .update({
        Status: "Order Cancled",
      })
      .then(() => {
        res.status(200).json({
          message: " cancel order success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    next(err);
  }
};

export const handleOrderPayment = async (req, res, next) => {
  try {
    await db
      .collection("Orders")
      .doc(req.body.uid)
      .collection("OrderList")
      .add(req.body.orderDetails)
      .then(() => {
        req.body.cart.items.map((p) =>
          db
            .collection("Products")
            .doc(p.ID)
            .update({
              Sales: p.Sales + p.qty,
            })
        );
      })
      .then(() => {
        // Delete cart user after order success
        db.collection("Cart")
          .doc(req.body.uid)
          .collection("CartProducts")
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              db.collection("Cart")
                .doc(req.body.uid)
                .collection("CartProducts")
                .doc(doc.id)
                .delete()
                .catch((err) => console.log(err));
            });
          })
          .catch((err) => console.log(err));
        console.log("delete cart success");
      });
    console.log("success Order to db");

    res.status(200).json({ message: " order payment success" });
  } catch (err) {
    next(err);
  }
};

export const getAdminOrders = async (req, res, next) => {
//   try {
//   const data=[];
//     const users = await db.collection("users").get();
//  const t= users.docs.map(async (doc) => {
//       let orders = await db
//         .collection("Orders")
//         .doc(doc.id)
//         .collection("OrderList")
//         .get();
//   const orderuser= orders.docs.map((doc)=> getOrder(doc)); 
// return orderuser
//    });
//            console.log(t);
//           res.status(200).json({
//             message: " get All  user orders success",
//             adminOrders: data,
//           });
//   } catch (err) {
//     next(err);
//   }
};
