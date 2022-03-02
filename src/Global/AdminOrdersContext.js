import { set } from "lodash";
import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../Config/Config";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "./UserContext";
import _ from "lodash";
export const AdminOrderContext = createContext();

export const AdminOrdersContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [AllOrderUsers, setAllOrdersUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  
useEffect(async()=> {
    if (user && user.type == "admin") {
      var AllOrders = [];
     const users = await db.collection("users").get();
            users.docs.map((doc) =>
            db
              .collection("Orders")
              .doc(doc.id)
              .collection("OrderList")
              .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if (change.type === "added") {
                    AllOrders.push(getOrder(change.doc));
                  }
                  if (change.type === "modified") {
                    _.remove(AllOrders, { ID: change.doc.id });
                    AllOrders.push(getOrder(change.doc));
                  }
                  setAllOrdersUser([...AllOrders]);
                });
              })
          );
      setSpinner(false);
    }
  },

  [user]
);
  return (
    <AdminOrderContext.Provider
      value={{ AllOrderUsers: [...AllOrderUsers], spinner: spinner }}
    >
      {props.children}
    </AdminOrderContext.Provider>
  );
};
