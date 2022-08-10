import { set } from "lodash";
import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../Config/Config";
// import { getOrder } from "../../../backend/src/DbModal/Order";
import { UserContext } from "./UserContext";
import _ from "lodash";
import axios from "axios";
export const AdminOrderContext = createContext();

export const AdminOrdersContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [AllOrderUsers, setAllOrdersUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  
useEffect(async()=> {
    if (user && user.type == "admin") {
       try {
          const result = await axios.get("/order/getAdminOrders");
          console.log('admin orders')
          console.log(result.data.adminOrders);
          //change set function
          setAllOrdersUser(result.data.adminOrders);
          setSpinner(false);
        } catch (err) {
          console.log(err);
        }
  }},
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
