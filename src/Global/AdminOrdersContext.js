
import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../Config/Config";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "./UserContext";
export const AdminOrderContext = createContext();

export const AdminOrdersContextProvider = (props) => {
  const { user } = useContext(UserContext);
  const [AllOrderUsers, setAllOrdersUser] = useState([]);
  const [spinner, setSpinner] = useState(true);

     useEffect( function getOrders(){
       if (user && user.type == "admin") {
        const AllOrders = [];
   db.collection("users").get().then((snapshot) => {
      snapshot.docs.map((doc) =>
        db
          .collection("Orders")
          .doc(doc.id + " Orders")
          .collection("OrderDetails")
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                AllOrders.push(getOrder(doc));
                setAllOrdersUser([...AllOrders]);
                setSpinner(false);
            });
          })
      );
    });   
      }
     }, [user]);

    //   const getOrders = () => {
    //         const AllOrders = [];

    //  db.collection("users").onSnapshot((snapshot) => {
    //     snapshot.docs.map((doc) =>
    //       db
    //         .collection("Orders")
    //         .doc(doc.id + " Orders")
    //         .collection("OrderDetails")
    //         .onSnapshot((snapshot) => {
    //           snapshot.docChanges().forEach((snap)=>{

    //             if(snap.type=="added")
    //             {
    //              AllOrders.push(getOrder(snap.doc));
    //             console.log(AllOrders);
    //             setAllOrdersUser([...AllOrders]);
    //             setSpinner(false);
    //            }
    //           })
            
    //         })
    //     );

    //   })
    // };
 
  return (
    <AdminOrderContext.Provider
      value={{ AllOrderUsers: [...AllOrderUsers], spinner: spinner }}
    >
      {props.children}
    </AdminOrderContext.Provider>
  );
};
 