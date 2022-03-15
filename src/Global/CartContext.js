import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { CartReducer } from "./CartReducer";
import { db } from "../Config/Config";
import { UserContext } from "./UserContext";

export const CartContext = createContext();
const defaultCartState = { items: [] };

export const CartContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [cart, dispatch] = useReducer(CartReducer, defaultCartState);
  
  // if user is login get cart from db
  useEffect(async () => {
    if (user) {
      let newCart = [];
      const response = await db
        .collection("Cart")
        .doc(user.uid)
        .collection("CartProducts")
        .get();
      response.docs.map((doc) =>
        newCart.push({
          ID: doc.id,
          ...doc.data(),
        })
      );
      return dispatch({ type: "Get_Data", data: [...newCart] });
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{ ...cart, cartUser: [...cart.items], dispatch }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
