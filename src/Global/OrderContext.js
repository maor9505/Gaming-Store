import React, { createContext, useEffect, useState,useContext } from "react";
import { db } from "../Config/Config";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "./UserContext";
export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
     const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
      if(user){
    const prevOrders = [];
    db.collection("Orders").doc(user.uid + " Orders")
        .collection("OrderDetails").orderBy('DateCreate','desc').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => prevOrders.push(getOrder(doc)));
          setOrders(prevOrders);
          setSpinner(false);
    });
}
  }, [user]);
  return (
    <OrderContext.Provider value={{ orders: [...orders], spinner: spinner }}>
      {props.children}
    </OrderContext.Provider>
  );
};
