import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { ProductColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { ProductsContext } from "../../Global/ProductsContext";
import { HeaderProducts } from "../common/HeaderProducts";
import { ProductVbarChart } from "../../Chart/ProductVbarChar";
import _ from "lodash";

export const ProductsView = () => {
  const { products, spinner } = useContext(ProductsContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [productsTotal, setproductsTotal] = useState(0);
  const [viewsTotal, setviewsTotal] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [mostViewProducts, setmostViewProducts] = useState("");

  useEffect(() => {
    setFilterProduct([...products]);
  }, [products]);

  // update  products details productsTotal/viewsTotal/mostViewProducts
  useEffect(() => {
    if (products.length != 0) {
      setproductsTotal(products.length);
      setTotalSales(
        _.sumBy(products, (o) => {
          return o.Sales;
        })
      );

      setviewsTotal(
        products.map((product) => product.Views).reduce((a, b) => a + b)
      );
      const mostViewProductsP = [...products];
      const highestMaxView = _.maxBy(mostViewProductsP, (o) => {
        return o.Views;
      });
      setmostViewProducts(highestMaxView.ProductName);
    }
  }, [products]);

  return (
    <div className="container">
      <h3>
        <span className="badge bg-light text-success p-4">
          Products Details:
        </span>
      </h3>
      <PanelView
        cardOne={productsTotal}
        cardOneText={"Total Products..."}
        cardTwo={totalSales}
        cardTwoText={"Total Products Sales..."}
        cardThree={viewsTotal}
        cardThreeText={"Total Views..."}
        cardFor={mostViewProducts}
        cardForText={"Most View Product..."}
      />
      <div className="container">
        <ProductVbarChart />
      </div>
      <h3>
        {" "}
        <span className="badge bg-light text-success">Products:</span>
      </h3>
      <div className="container">
        <HeaderProducts
          data={products}
          setFilterProduct={setFilterProduct}
        ></HeaderProducts>

        <Table data={filterProduct} Columns={ProductColumn}></Table>
      </div>
    </div>
  );
};
