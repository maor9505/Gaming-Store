import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Global/UserContext";
import { OrdersColumn } from "../Utils/TableColumn";
import { Table } from "../Utils/Table";
import { useHistory } from "react-router-dom";
import { LoadingPage } from "./loading-page/LoadingPage";
import { OrderContext } from "../Global/OrderContext";
import _ from'lodash';
export const Orders = () => {
  const { user } = useContext(UserContext);
  const { orders,spinner } = useContext(OrderContext);
  const history = useHistory();

  // if user not login send to login page 
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } 
  }, [user]);


 
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
          <Table
            data={orders}
            Columns={OrdersColumn}
          ></Table>
        </div>
      )}
    </div>
  );
};
