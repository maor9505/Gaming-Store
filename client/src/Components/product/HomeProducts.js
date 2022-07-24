import React, { useContext, useState, useEffect } from "react";
import "../../styles/Product.css";
import { ProductsContext } from "../../Global/ProductsContext";
import { Product } from "./Product";

export const HomeProducts = () => {
  const { products } = useContext(ProductsContext);
  const [filterProduct, setFilterProduct] = useState([]);

  // sort by Views to Desc products views
  useEffect(() => {
    let sortProductsByViews = products.sort((a, b) => b.Sales - a.Sales);
    sortProductsByViews = sortProductsByViews.slice(0, 4);
    setFilterProduct(sortProductsByViews);
  }, [products]);

  return (
    <div className="row mt-3">
      {filterProduct.length === 0 && <div>No Products To Display...</div>}
      {filterProduct.map((product) => (
        <div key={product.ID} className="col-md-6 col-lg-3">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};
