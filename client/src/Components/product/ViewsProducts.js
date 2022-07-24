import React, { useContext, useState, useMemo } from "react";
import { ProductsContext } from "../../Global/ProductsContext";
import "../../styles/Product.css";
import { Pagination } from "../common/Pagiantion";
import { paginate } from "../common/paginat";
import { Product } from "./Product";

export const ViewsProducts = () => {
  const { products } = useContext(ProductsContext);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  //sort
  const sortProducts = useMemo(() => {
    return products.sort((a, b) => b.Views - a.Views);
  }, [products]);

  const productsP = paginate(sortProducts, currentPage, pageSize);
  // function the handle the page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      {productsP.length !== 0 && (
        <h1 className="text-success"> Views Products</h1>
      )}
      <div className="row mt-4">
        {productsP.length === 0 && <div>No Products To Display...</div>}
        {productsP.map((product) => (
          <div className="col-sm-3 col-md-6 " key={product.ID}>
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          itemsCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
