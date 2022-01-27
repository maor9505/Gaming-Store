import React, {useContext } from "react";

import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../Config/Config";
import { ToastAlert } from "../Utils/Toast";
import { UserContext } from "./UserContext";

export const CartReducer = (state, action) => {
    let uid = auth.currentUser.uid;
  let product;
// cart option
  switch (action.type) {
    case "ADD_TO_CART":
      product = action.product;
      product["qty"] = 1;
      db.collection("Cart")
        .doc("Cart " + uid)
        .collection("CartProducts")
        .doc(product.ID)
        .set(product)
        .then(() => {
          console.log("success uplode to cart user");
          ToastAlert("this product is Add to Cart");
        })
        .catch((err) => console.log(err.message));
    
      break;

    case "INC":
      product = action.cart;
      product.qty = ++product.qty;
      db.collection("Cart")
        .doc("Cart " + uid)
        .collection("CartProducts")
        .doc(product.ID)
        .update(product);
      break;

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        db.collection("Cart")
          .doc("Cart " + uid)
          .collection("CartProducts")
          .doc(product.ID)
          .update(product);
      } else {
        return state;
      }
      break;

    case "DELETE":
      console.log('delte')
      product = action.cart;
            console.log(product.ID);

      db.collection("Cart")
        .doc("Cart " + uid)
        .collection("CartProducts")
        .doc(product.ID)
        .delete();

      break;

    default:
      return state;
  }
};
