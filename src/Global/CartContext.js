import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import { CartReducer } from "./CartReducer";
import { db } from "../Config/Config";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [cart, dispatch] = useReducer(CartReducer);
  const [cartUser, setCart] = useState([]);

  // if user is login get cart from db
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  // get cart from db
  const getCart = () => {
    db.collection("Cart")
      .doc(user.uid)
      .collection("CartProducts")
      .onSnapshot((snapshot) => {
        let newCart = [];
        snapshot.forEach((doc) => {
          newCart.push({
            ID: doc.id,
            ...doc.data(),
          });
        });
        setCart(newCart);
      });
  };

  return (
    <CartContext.Provider
      value={{ cartUser: [...cartUser], ...cart, dispatch }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
