
import React, { createContext, useReducer, useEffect,useState,useContext } from 'react'
import { CartReducer } from './CartReducer';
import { db } from "../Config/Config";
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartContextProvider = (props) => {     const { user } = useContext(UserContext);
const [cart, dispatch] = useReducer(CartReducer)
const [cartUser, setCart] = useState([]);

useEffect(() => {
  if (user) {
    db.collection("Cart")
      .doc("Cart " + user.uid)
      .collection("CartProducts")
      .onSnapshot((snapshot) => {
        const newCart = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }));
        setCart(newCart);
      });
  }
}, [user]);
    return (
      <CartContext.Provider value={{ cartUser: [...cartUser], ...cart, dispatch }}>
        {props.children}
      </CartContext.Provider>
    );
}









