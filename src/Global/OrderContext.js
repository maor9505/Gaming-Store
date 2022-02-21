import React, { createContext, useEffect, useState,useContext } from "react";
import { db } from "../Config/Config";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "./UserContext";
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

  const getOrders=()=>{
    db.collection("Orders")
      .doc(user.uid)
      .collection("OrderList")
      .orderBy("DateCreate", "desc")
      .onSnapshot((snapshot) => {
            let prevOrders = [];
        snapshot.docs.map((doc) => prevOrders.push(getOrder(doc)));
        setOrders(prevOrders);
        setSpinner(false);

      });
  }
  return (
    <OrderContext.Provider value={{ orders: [...orders], spinner: spinner }}>
      {props.children}
    </OrderContext.Provider>
  );
};
