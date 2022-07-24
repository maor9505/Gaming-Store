import { db } from "../config/Config.js";

export const getCart = async (req, res, next) => {
  const data = [];
  try {
    await db
      .collection("Cart")
      .doc(req.query.uid)
      .collection("CartProducts")
      .get()
      .then((response) => {
        response.docs.map((doc) =>
          data.push({
            ID: doc.id,
            ...doc.data(),
          })
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    res
      .status(200)
      .json({ message: " get All  cart products success", cart: data });
  } catch (err) {
    next(err);
  }
};
export const addProductToCart = async (req, res, next) => {
  try {
   await db
     .collection("Cart")
     .doc(req.body.uid)
     .collection("CartProducts")
     .doc(req.body.product.ID)
     .set(req.body.product)
     .catch((err) => {
        console.log(err)
     });
      res
        .status(200)
        .json({ message: " add to cart success"});
  } catch (err) {
    next(err);
  }
};
export const incProductToCart = async (req, res, next) => {
  try {
    await db
      .collection("Cart")
      .doc(req.body.uid)
      .collection("CartProducts")
      .doc(req.body.product.ID)
      .update(req.body.product)
      .catch((err) => console.log(err));
    res.status(200).json({ message: " inc product in cart success" });
  } catch (err) {
    next(err);
  }
};
export const decProductToCart = async (req, res, next) => {
  try {
    await db
      .collection("Cart")
      .doc(req.body.uid)
      .collection("CartProducts")
      .doc(req.body.product.ID)
      .update(req.body.product)
      .catch((err) => console.log(err));
    res.status(200).json({ message: " dec product in cart success" });
  } catch (err) {
    next(err);
  }
};

export const deleteProductToCart = async (req, res, next) => {
  try {
    await db
      .collection("Cart")
      .doc(req.body.uid)
      .collection("CartProducts")
      .doc(req.body.product.ID)
      .delete()
      .catch((err) => console.log(err));
    res.status(200).json({ message: " delete product in cart success" });
  } catch (err) {
    next(err);
  }
};
