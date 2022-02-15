import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../Config/Config";
import { ToastAlert } from "../Utils/Toast";

export const CartReducer = (state, action) => {
    let uid = auth.currentUser.uid;
  let product;
  
  switch (action.type) {
    case "ADD_TO_CART":
      product = action.product;
      product["qty"] = 1;
      db.collection("Cart")
        .doc(uid)
        .collection("CartProducts")
        .doc(product.ID)
        .set(product)
        .then(() => {
          ToastAlert("this product is Add to Cart");
        })
        .catch((err) => console.log(err.message));
    
      break;

    case "INC":
      product = action.cart;
      product.qty = ++product.qty;
      db.collection("Cart")
        .doc(uid)
        .collection("CartProducts")
        .doc(product.ID)
        .update(product);
      break;

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        db.collection("Cart")
          .doc(uid)
          .collection("CartProducts")
          .doc(product.ID)
          .update(product);
      } else {
        return state;
      }
      break;

    case "DELETE":
      product = action.cart;
      db.collection("Cart")
        .doc(uid)
        .collection("CartProducts")
        .doc(product.ID)
        .delete();

      break;

    default:
      return state;
  }
};
