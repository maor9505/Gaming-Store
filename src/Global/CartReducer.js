import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../Config/Config";
import { ToastAlert } from "../Utils/Toast";

export const CartReducer = (state, action) => {
  let uid = auth.currentUser.uid;
  let product;
  let newCart;
  switch (action.type) {
    case "Get_Data":
      return { items: [...action.data] };
    case "ADD_TO_CART":
      newCart = [...state.items];
      product = { ...action.product };
      const isFind = newCart.find((pro) => pro.ID == product.ID);
      if (product.MaxQty > 0 && !isFind) {
        product["qty"] = 1;
        db.collection("Cart")
          .doc(uid)
          .collection("CartProducts")
          .doc(product.ID)
          .set(product)
          .catch((err) =>
            ToastAlert("Internet problems may not be implemented")
          );
        newCart.push(product);
        ToastAlert("this product is Add to Cart");
      } else {
        ToastAlert(
          isFind ? "already in your cart..." : "This Product Is Out Of Stock"
        );
      }
      return { items: [...newCart] };

    case "INC":
      newCart = [...state.items];
      product = { ...action.product };
      if (product.qty < product.MaxQty) {
        product.qty = ++product.qty;
        db.collection("Cart")
          .doc(uid)
          .collection("CartProducts")
          .doc(product.ID)
          .update(product)
          .catch((err) =>
            ToastAlert("Internet problems may not be implemented")
          );
        let productInCart = newCart.findIndex((pro) => pro.ID === product.ID);
        newCart[productInCart] = { ...product };
      } else
        ToastAlert(
          `There is no more in Quantity try again later! \n Quantity: ${product.MaxQty}`
        );

      return { items: [...newCart] };

    case "DEC":
      newCart = [...state.items];
      product = { ...action.product };
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        db.collection("Cart")
          .doc(uid)
          .collection("CartProducts")
          .doc(product.ID)
          .update(product)
          .catch((err) =>
            ToastAlert("Internet problems may not be implemented")
          );
        let productInCart = newCart.findIndex((pro) => pro.ID === product.ID);
        newCart[productInCart] = { ...product };
      } 
      return { items: [...newCart] };

    case "DELETE":
      product = { ...action.product };
      db.collection("Cart")
        .doc(uid)
        .collection("CartProducts")
        .doc(product.ID)
        .delete()
        .catch((err) => ToastAlert("Internet problems may not be implemented"));
      newCart = [...state.items];
      let newCart2 = newCart.filter((pro) => pro.ID !== product.ID);
      return { items: [...newCart2] };

    default:
      return state;
  }
};
