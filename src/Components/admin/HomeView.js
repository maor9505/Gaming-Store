import React, { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { OrdersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { ProductsContext } from "../../Global/ProductsContext";
import _ from 'lodash'

export const HomeView = () => {
  const { AllOrderUsers } = useContext(AdminOrderContext);
    const { products } = useContext(ProductsContext);
  const [ordersTotal, setordersTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [waitOrders, setWaitOrders] = useState(0);
  const [cancleOrders, setCancleOrders] = useState(0);
  
  // update  products details productsTotal/viewsTotal/mostViewProducts
  const productdetails = useMemo(()=>{
    if(products.length>0){
      const totalProducts = products.length;
      const totalSales = _.sumBy(products, (o) => {
        return o.Sales;
      });
      const totalViews = products
        .map((product) => product.Views)
        .reduce((a, b) => a + b);
         const highestMaxView = _.maxBy(products, (o) => {
           return o.Views;
         });
         return {
           totalProducts: totalProducts,
           totalSales: totalSales,
           totalViews: totalViews,
           highestMaxView: highestMaxView.ProductName,
         };
    }
     return {};

  },[products])
  
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
  }, [AllOrderUsers]);

  return (
    <div className="container">
      <h3>
        <span className="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
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
      <h1></h1>
      <h3>
        <span className="badge bg-light text-success p-4">
          Products Details:
        </span>
      </h3>
      <PanelView
        cardOne={productdetails.totalProducts}
        cardOneText={"Total Products..."}
        cardTwo={productdetails.totalSales}
        cardTwoText={"Total Products Sales..."}
        cardThree={productdetails.totalViews}
        cardThreeText={"Total Views..."}
        cardFor={productdetails.highestMaxView}
        cardForText={"Most View Product..."}
      />
      <div className="">
        <Table
          data={_.orderBy(AllOrderUsers, "DateCreate", "desc")}
          Columns={OrdersColumn}
        ></Table>
      </div>
    </div>
  );
};
