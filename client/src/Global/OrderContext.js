import React, { createContext, useEffect, useState,useContext } from "react";
import { db } from "../Config/Config";
import { UserContext } from "./UserContext";
    import axios from "axios";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(true);

  // get user order if his login 
  useEffect(() => {
      if(user){
      getOrders();
    }
  },[user]);

   const getOrders =  async() => {
    try {
          const result = await axios.get("/order/getOrders",{ params: {uid:user.uid}});
          setOrders(result.data.orders);
          setSpinner(false);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <OrderContext.Provider value={{ orders: [...orders], spinner: spinner }}>
      {props.children}
    </OrderContext.Provider>
  );
};
