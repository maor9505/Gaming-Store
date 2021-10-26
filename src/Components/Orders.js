import React,{useContext,useState,useEffect} from "react";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "../Global/UserContext";
import { OrdersColumn} from "../Utils/TableColumn";
import { Table } from "../Utils/Table";
import { db } from "../Config/Config";


export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext);

   useEffect(() => {
     const prevOrders = [];
     db.collection('Orders').doc(user.uid + ' Orders').collection('OrderDetails').onSnapshot((snapshot) => {
       snapshot.docs.map((doc) => prevOrders.push(getOrder(doc)));
       setOrders(prevOrders);
     });
   }, []);
  return (
    <div class="container">
      {/* send OrderColumn */}
      {/* send orders arry to table */}
      <Table Columns={OrdersColumn}></Table>
    </div>
  );
};
