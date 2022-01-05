import React, { useContext, useEffect, useState } from "react";
import { Table } from "../../Utils/Table";
import { Pagination } from "../common/Pagiantion";
import { paginate } from "../common/paginat";
import { PanelView } from "./PanelView";
import { OrdersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { ProductsContext } from "../../Global/ProductsContext";


export const HomeView = () => {
  const { AllOrderUsers} = useContext(AdminOrderContext);
  const [ordersTotal, setordersTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [waitOrders, setWaitOrders] = useState(0);
  const [cancleOrders, setCancleOrders] = useState(0);
   const { products, spinner } = useContext(ProductsContext);
   const [filterProduct, setFilterProduct] = useState([]);
   const [productsTotal, setproductsTotal] = useState(0);
   const [viewsTotal, setviewsTotal] = useState(0);
   const [mostViewProducts, setmostViewProducts] = useState("");
   
  useEffect(() => {
    if (products.length != 0) {
      setproductsTotal(products.length);
      setviewsTotal(
        products.map((product) => product.Views).reduce((a, b) => a + b)
      );
      const mostViewProductsP = [...products];
      const highestMaxView = Math.max(
        ...mostViewProductsP.map((product) => product.Views)
      );

      const mostViewProduct = mostViewProductsP.find(
        (product) => product.Views === highestMaxView
      );
      setmostViewProducts(mostViewProduct.ProductName);
    }
  }, [products]);
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
    <div class="container">
      <h3>
        <span class="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
      <PanelView
        cardOne={ordersTotal}
        cardOneText={"Order Total..."}
        cardTwo={incomeTotal+"$"}
        cardTwoText={"Total Income..."}
        cardThree={waitOrders}
        cardThreeText={"Waiting Orders..."}
        cardFor={cancleOrders}
        cardForText={"Cancled Orders..."}
      />
      <h1></h1>
      <h3>
        <span class="badge bg-light text-success p-4">Products Details:</span>
      </h3>
      <PanelView
        cardOne={productsTotal}
        cardOneText={"Products Total..."}
        cardTwo={viewsTotal}
        cardTwoText={"Views Total..."}
        cardThree={mostViewProducts}
        cardThreeText={"Most view Product..."}
        cardFor={"?"}
        cardForText={"???"}
      />
      {/* <div className="">
        <Table data={AllOrderUsers} Columns={OrdersColumn}></Table>
      </div> */}
    </div>
  );
};
