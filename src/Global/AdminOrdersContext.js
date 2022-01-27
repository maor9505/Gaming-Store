
import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../Config/Config";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "./UserContext";
export const AdminOrderContext = createContext();

export const AdminOrdersContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [AllOrderUsers, setAllOrdersUser] = useState([]);
  const [spinner, setSpinner] = useState(true);

     useEffect( 
       function getOrders(){
       if (user && user.type == "admin") {
        var AllOrders = [];
   db.collection("users").get().then((snapshot) => {
      snapshot.docs.map((doc) =>
        db
          .collection("Orders")
          .doc(doc.id + " Orders")
          .collection("OrderDetails")
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach( ( change ) => {
              if (change.type === "added") {
                AllOrders.push(getOrder(change.doc));
              }
              if (change.type === "modified") {
                   AllOrders = AllOrders.filter(
                     (item) => item.ID !== change.doc.id
                   );
                    AllOrders.push(getOrder(change.doc));   
              }
                setSpinner(false);
                setAllOrdersUser([...AllOrders]);
            })

        }));

    });   
      }
     }, [user]);

  
  return (
    <AdminOrderContext.Provider
      value={{ AllOrderUsers: [...AllOrderUsers], spinner: spinner }}
    >
      {props.children}
    </AdminOrderContext.Provider>
  );
};
 