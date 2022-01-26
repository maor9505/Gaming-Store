import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Global/UserContext";
import { OrdersColumn } from "../Utils/TableColumn";
import { Table } from "../Utils/Table";
import { useHistory } from "react-router-dom";
import { LoadingPage } from "./loading-page/LoadingPage";
import { OrderContext } from "../Global/OrderContext";

export const Orders = () => {
  const { user } = useContext(UserContext);
  const { orders,spinner } = useContext(OrderContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } 
  }, [user]);


 
  return (
    <div class="container-fluid">
      <h1></h1>
      {spinner && (
        <div class="container">
          <LoadingPage />
        </div>
      )}
      {!spinner && (
        <div class="container">
          <div>
            <span class='text-success'>Total:{orders.length}</span>
            <Table data={[...orders]} Columns={OrdersColumn}></Table>
          </div>
        </div>
      )}
    </div>
  );
};
