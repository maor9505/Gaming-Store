import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { OrdersColumn, ProductColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { orderBy } from "lodash";
export const OrderView = () => {

  const { AllOrderUsers } = useContext(AdminOrderContext);
 const [filterOrders, setfilterOrders] = useState([]);
  const [ordersTotal, setordersTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [waitOrders, setWaitOrders] = useState(0);
  const [cancleOrders, setCancleOrders] = useState(0);
    const [dateFilter, setdateFilter] = useState("");

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

  const filterOrderDesc=()=>{
      return orderBy(AllOrderUsers, "DateCreate", "desc");
  }
const filterArrayByDate =(value)=>{
  console.log("value");
  console.log(value);
    setdateFilter(value);
  const arr= [];
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
        arr.push(or)
    }
  });
  setfilterOrders(arr);
}
const cancleDateB = () => {
    setdateFilter("")
  setfilterOrders(filterOrderDesc());
};
  return (
    <div class="container ">
      <h3>
        <span class="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
      <PanelView
        cardOne={ordersTotal}
        cardOneText={"Order Total..."}
        cardTwo={incomeTotal + "$"}
        cardTwoText={"Total Income..."}
        cardThree={waitOrders}
        cardThreeText={"Waiting Orders..."}
        cardFor={cancleOrders}
        cardForText={"Cancled Orders..."}
      />
      <h1></h1>
      <h3>
        {" "}
        <span class="badge bg-light text-success p-4">Orders:</span>
      </h3>
      <label className="m-3 p-3 text-success">Filter Orders By Date...</label>
      <div class="d-inline">
        <input
          type="date"
          className=" col-3 p-2"
          onChange={(e) => filterArrayByDate(e.target.value)}
            value={dateFilter}
        />
        <button className="btn btn-success btn-md m-3 " onClick={()=>cancleDateB()}>
          <i class="fa fa-window-close"></i>
        </button>
      </div>
      <br />
      <div className="">
        <Table data={filterOrders} Columns={OrdersColumn}></Table>
      </div>
    </div>
  );
};