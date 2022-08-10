import React, { useContext, useEffect, useState} from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import { ProductColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { ProductsContext } from "../../Global/ProductsContext";
import { HeaderProducts } from "../common/HeaderProducts";
import { ProductVbarChart } from "../../Chart/ProductVbarChar";
import _ from "lodash";
import { handelProductsDetails } from "./common/ProductDetailsFilter";

export const ProductsView = () => {
  const { products} = useContext(ProductsContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [productsDetails, setProductsDetails] = useState({});

  useEffect(() => {
    const productsDetailsAfterFilter = handelProductsDetails(products);
    console.log("Total Products..." + productsDetailsAfterFilter);
    setProductsDetails(productsDetailsAfterFilter);
  }, [products]);

  useEffect(() => {
    setFilterProduct([...products]);
  }, [products]);


  return (
    <div className="container">
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
