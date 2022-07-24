import React, { useContext, useEffect, useState} from "react";
import { UserContext } from "../../Global/UserContext";
import { OrdersColumn } from "../../Utils/TableColumn";
import { Table } from "../../Utils/Table";
import { useHistory } from "react-router-dom";
import { LoadingPage } from "../loading-page/LoadingPage";
import { OrderContext } from "../../Global/OrderContext";
import axios from "axios";
export const Orders = () => {
  // const { orders,spinner } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(true);

  // get user order if his login
  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  const getOrders = async () => {
    try {
      const result = await axios.get("/order/getOrders", {
        params: { uid: user.uid },
      });
      console.log("order data");
      console.log(result.data.orders);
      setOrders(result.data.orders);
      setSpinner(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h1></h1>
      {spinner && (
        <div className="container">
          <LoadingPage />
        </div>
      )}
      {!spinner && (
        <div className="container">
          <span className="text-success">Total Orders:{orders.length}</span>
          <Table data={orders} Columns={OrdersColumn}></Table>
        </div>
      )}
    </div>
  );
};
