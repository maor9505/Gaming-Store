import React, { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { OrdersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { ProductsContext } from "../../Global/ProductsContext";
import _ from "lodash";
import { handelProductsDetails } from "./common/ProductDetailsFilter";
import { handelOrdersDetails } from "./common/OrderDetailsFilter";

export const HomeView = () => {
  const { AllOrderUsers } = useContext(AdminOrderContext);
  const { products } = useContext(ProductsContext);
  const [productsDetails, setProductsDetails] = useState({});
  const [ordersDetails, setOrdersDetails] = useState({});

  useEffect(() => {
    const productsDetailsAfterFilter = handelProductsDetails(products);
    console.log("Total Products..." + productsDetailsAfterFilter);
    setProductsDetails(productsDetailsAfterFilter);
  }, [products]);

  // update ordersTotal/incomeTotal/waitOrders/cancleOrders
  useEffect(() => {
    const ordersDetailsFilter = handelOrdersDetails(AllOrderUsers);
    console.log(ordersDetailsFilter);
    setOrdersDetails(ordersDetailsFilter);
  }, [AllOrderUsers]);

  return (
    <div className="container">
      <h3>
        <span className="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
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
      <h1></h1>
      <h3>
        <span className="badge bg-light text-success p-4">
          Products Details:
        </span>
      </h3>
      <PanelView
        cardOne={productsDetails.totalProducts}
        cardOneText={"Total Products..."}
        cardTwo={productsDetails.totalSales}
        cardTwoText={"Total Products Sales..."}
        cardThree={productsDetails.totalViews}
        cardThreeText={"Total Views..."}
        cardFor={productsDetails.highestMaxView}
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
