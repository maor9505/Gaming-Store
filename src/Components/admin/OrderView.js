import React, { useContext, useEffect, useState } from "react";
import { db } from "../../Config/Config";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { OrdersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import _, { orderBy } from "lodash";
import { ProductDoughnutChart } from "../../Chart/ProductDoughnutChart";
import { OrderMonthBarChar } from "../../Chart/OrderMonthBarChar";

export const OrderView = () => {
  const { AllOrderUsers } = useContext(AdminOrderContext);
  const [filterOrders, setfilterOrders] = useState([]);
  const [ordersTotal, setordersTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [waitOrders, setWaitOrders] = useState(0);
  const [cancleOrders, setCancleOrders] = useState(0);
  const [dateFilter, setdateFilter] = useState("");
  const orderColumn = OrdersColumn();
  orderColumn.push({
    path: "",
    label: "",
    content: (order) =>
      order.Status == "Order Was accepted and delivered" ? (
        <button
          className="fa fa-list-alt btn-outline-success"
          onClick={() => updateStatusOrder(order)}
        ></button>
      ) : (
        <button
          className="fa fa-list-alt btn-outline-danger"
          onClick={() => updateStatusOrder(order)}
        ></button>
      ),
  });

  //update Status Order in db
  const updateStatusOrder = (order) => {
    if (order.Status != "Order Cancled"){
      db.collection("Orders")
        .doc(order.UserID)
        .collection("OrderList")
        .doc(order.ID)
        .update({
          Status: "Order Was accepted and delivered",
        });
      }
  };
  // update ordersTotal/incomeTotal/waitOrders/cancleOrders
  useEffect(() => {
    if (AllOrderUsers.length != 0) {
      setordersTotal(AllOrderUsers.length);
      setIncomeTotal(
        AllOrderUsers.map((order) => order.TotalPrice).reduce((a, b) => a + b)
      );
      const waitOrdersArr = [...AllOrderUsers];
      const wait = waitOrdersArr.filter(
        (item) => item.Status === "In Procces..."
      );
      setWaitOrders(wait.length);
      const cancleOrderArr = [...AllOrderUsers];
      const cancle = cancleOrderArr.filter(
        (item) => item.Status === "Order Cancled"
      );
      setCancleOrders(cancle.length);
    }
    setfilterOrders(filterOrderDesc());
  }, [AllOrderUsers]);

  const filterOrderDesc = () => {
    return orderBy(AllOrderUsers, "DateCreate", "desc");
  };
  //filter array by ID Order
  const filterOrderByID= (value) => {
    let order = _.find(AllOrderUsers, {'ID':value});
        setfilterOrders((order)?[order]:[]);
  };
  //filter data by date
  const filterArrayByDate = (value) => {
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
  const cancleDateB = () => {
    setdateFilter("");
    document.getElementById('idOrder').value=''
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
            cardOne={ordersTotal}
            cardOneText={"Total Orders..."}
            cardTwo={incomeTotal + "$"}
            cardTwoText={"Total Income..."}
            cardThree={waitOrders}
            cardThreeText={"Waiting Orders..."}
            cardFor={cancleOrders}
            cardForText={"Cancled Orders..."}
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
          onChange={(e) => filterOrderByID(e.target.value)}
          placeholder="Filter Orders By ID:"
        />
        <input
          type="date"
          className=" col-3  m-2"
          onChange={(e) => filterArrayByDate(e.target.value)}
          value={dateFilter}
        />
        <button
          className="btn btn-success btn-md m-3 "
          onClick={() => cancleDateB()}
        >
          <i className="fa fa-window-close"></i>
        </button>
      </div>
      <br />
      <Table data={filterOrders} Columns={orderColumn}></Table>
    </div>
  );
};
