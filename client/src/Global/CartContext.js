import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { CartReducer } from "./CartReducer";
import { db } from "../Config/Config";
import { UserContext } from "./UserContext";
import axios from "axios";


export const CartContext = createContext();
const defaultCartState = { items: [] };

export const CartContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [cart, dispatch] = useReducer(CartReducer, defaultCartState);
  
  // if user is login get cart from db
  useEffect(async () => {
    if (user) {
      getCart();
    }
  }, [user]);

   const getCart = async () => {
     try {
       const result = await axios.get("/cart/getCart",{ params: {uid:user.uid}});
       console.log("cart data");
       console.log(result.data.cart);
       dispatch({ type: "Set_Data", data: [...result.data.cart] });
     } catch (err) {
       console.log(err);
     }
   };
  return (
    <CartContext.Provider
      value={{ cart, dispatch }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
