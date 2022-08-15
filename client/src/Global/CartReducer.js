import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../Config/Config";
import { ToastAlert } from "../Utils/Toast";

export const CartReducer = (state, action) => {
  let product;
  let newCart;
  let productInCart; 
  switch (action.type) {
    case "Set_Data":
      return { items: [...action.data] };
    case "ADD_TO_CART":
      newCart = [...state.items];
      product = { ...action.product };
      newCart.push(product);
      ToastAlert("this product is Add to Cart");
      return { items: [...newCart] };

    case "INC":
      newCart = [...state.items];
      product = { ...action.product };
         productInCart = newCart.findIndex((pro) => pro.ID === product.ID);
        newCart[productInCart] = { ...product };
      return { items: [...newCart] };

    case "DEC":
      newCart = [...state.items];
      product = { ...action.product };
         productInCart = newCart.findIndex((pro) => pro.ID === product.ID);
        newCart[productInCart] = { ...product };
    
      return { items: [...newCart] };

    case "DELETE":
      product = { ...action.product };
      newCart = [...state.items];
      let newCart2 = newCart.filter((pro) => pro.ID !== product.ID);
      return { items: [...newCart2] };

    default:
      return state;
  }
};
