import React, { useContext, useEffect, useState } from "react";
import { db } from "../../Config/Config";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { OrdersAdminColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import _, { orderBy } from "lodash";
import { ProductDoughnutChart } from "../../Chart/ProductDoughnutChart";
import { OrderMonthBarChar } from "../../Chart/OrderMonthBarChar";
import { handelOrdersDetails } from "./common/OrderDetailsFilter";
import axios from "axios";
import { ToastAlert } from "../../Utils/Toast";

export const OrderView = () => {
  const { AllOrderUsers, setAllOrdersUser } = useContext(AdminOrderContext);
  const [filterOrders, setfilterOrders] = useState([]);
  const [dateFilter, setdateFilter] = useState("");
  const [ordersDetails, setOrdersDetails] = useState({});

  // update ordersTotal/incomeTotal/waitOrders/cancleOrders
  useEffect(() => {
    const ordersDetailsFilter = handelOrdersDetails(AllOrderUsers);
    console.log(ordersDetailsFilter);
    setOrdersDetails(ordersDetailsFilter);
    setfilterOrders(filterOrderDesc());
  }, [AllOrderUsers]);

  //update Status Order in db
  const updateStatusOrder = async(order) => {
    if (order.Status != "Order Cancled") {
     const res = await axios.post("/order/updateAdminOrders",order);
      const newOrders = [...AllOrderUsers];
     const tempOrder = AllOrderUsers.findIndex((ord) => ord.ID === order.ID);
     order.Status= "Order Was accepted and delivered"
     newOrders[tempOrder] = { ...order};
     setAllOrdersUser(newOrders);
     ToastAlert("order updated");
    }
  };
  const filterOrderDesc = () => {
    return orderBy(AllOrderUsers, "DateCreate", "desc");
  };
  //filter array by  User ID Order
  const filterOrderByUserID = (value) => {
    let order = _.filter([...AllOrderUsers], ["UserID", value]);
    setfilterOrders(order ? [...order] : []);
  };
  //filter array by ID Order
  const filterOrderByID = (value) => {
    let order = _.find(AllOrderUsers, { ID: value });
    setfilterOrders(order ? [order] : []);
  };
  //filter data by date
  const filterByDate = (value) => {
    console.log("value");
    console.log(value);
    setdateFilter(value);
    const arr = [];
    AllOrderUsers.map((or) => {
      let date = new Date(or.DateCreate);
      let dateS =
        date.getFullYear() +
        "-" +
        (date.getMonth() < 10
          ? "0" + parseInt(date.getMonth() + 1)
          : parseInt(date.getMonth() + 1)) +
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
      if (value === dateS) {
        arr.push(or);
      }
    });
    setfilterOrders(arr);
  };
  const handleResetButtom = () => {
    setdateFilter("");
    document.getElementById("idOrder").value = "";
    setfilterOrders(filterOrderDesc());
  };
  return (
    <div className="container">
      <h3>
        <span className="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
      <div className="container  justify-content-center">
        <div className="container">
          <PanelView
            cardOne={ordersDetails.totalOrders}
            cardOneText={"Total Orders..."}
            cardTwo={ordersDetails.incomeTotal + "$"}
            cardTwoText={"Total Income..."}
            cardThree={ordersDetails.waitOrders}
            cardThreeText={"Waiting Orders..."}
            cardFor={ordersDetails.cancelOrders}
            cardForText={"Cancel Orders..."}
          />
        </div>
        <div className="row align-items-end">
          <div className="col-xl-8  mb-5">
            <OrderMonthBarChar />
          </div>
          <div className="col-xl-4 mb-5 ">
            <ProductDoughnutChart />
          </div>
        </div>
      </div>
      <h1></h1>
      <h3>
        {" "}
        <span className="badge bg-light text-success p-4">Orders:</span>
      </h3>
      <div className="d-inline d-flex">
        {/* <label className="m-3 p-3 text-success">Filter Orders By ID:</label> */}
        <input
          type="text"
          id="idOrder"
          className=" col-3  m-2"
          onChange={(e) => filterOrderByUserID(e.target.value)}
          placeholder="Filter Orders By  User ID:"
        />
        <input
          type="text"
          id="idOrder"
          className=" col-3  m-2"
          onChange={(e) => filterOrderByID(e.target.value)}
          placeholder="Filter Orders By ID:"
        />
        <input
          type="date"
          className=" col-3  m-2"
          onChange={(e) => filterByDate(e.target.value)}
          value={dateFilter}
        />
        <button
          className="btn btn-success btn-md m-3 "
          onClick={() => handleResetButtom()}
        >
          <i className="fa fa-window-close"></i>
        </button>
      </div>
      <br />
      <Table
        data={filterOrders}
        Columns={OrdersAdminColumn({ updateStatusOrder: updateStatusOrder })}
      ></Table>
    </div>
  );
};
