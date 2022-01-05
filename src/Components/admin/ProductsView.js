import React, { useContext, useEffect, useState,useMemo } from "react";
import { Table } from "../../Utils/Table";
import { Pagination } from "../common/Pagiantion";
import { paginate } from "../common/paginat";
import { PanelView } from "./PanelView";
import {ProductColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { ProductsContext } from "../../Global/ProductsContext";
import {HeaderProducts} from "../common/HeaderProducts";

export const ProductsView = () => {
  const { products, spinner } = useContext(ProductsContext);
      const [filterProduct, setFilterProduct] = useState([]);
  const [productsTotal, setproductsTotal] = useState(0);
  const [viewsTotal, setviewsTotal] = useState(0);
  const [mostViewProducts, setmostViewProducts] = useState("");
  
useEffect(() => {
  setFilterProduct([...products]);
}, [products]);
// useMemo(() => {
//   setFilterProduct([...products]);
// }, products);

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

  return (
    <div class="container ">
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
      <h1></h1>
      <h3>
        {" "}
        <span class="badge bg-light text-success">Products:</span>
      </h3>

      <div className="">
        <HeaderProducts
          data={products}
          setFilterProduct={setFilterProduct}
        ></HeaderProducts>

        <Table data={filterProduct} Columns={ProductColumn}></Table>
      </div>
    </div>
  );
};
