import React, { useContext, useState, useCallback } from "react";
import { ProductsContext } from "../../Global/ProductsContext";
import "../../styles/Product.css";
import { Pagination } from "../common/Pagiantion";
import { paginate } from "../common/paginat";
import { HeaderProducts } from "../common/HeaderProducts";
import { Product } from "./Product";

export const Products = () => {
  const { products } = useContext(ProductsContext);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProduct, setFilterProduct] = useState([]);
  const productsP = paginate(filterProduct, currentPage, pageSize);

  // function the handle the page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      <div className="container ">
        <h1 className="text-success"> Products</h1>
        <HeaderProducts data={products} setFilterProduct={setFilterProduct} />
      </div>

      <div className="container d-flex justify-content-center mt-4">
        {productsP.length === 0 && (
          <div>
            No Products To Display...Or your opttion search id not Correct
          </div>
        )}
        <div className="row d-flex justify-content-center  mt-4 ">
          {productsP.map((product) => (
            <div className="col " key={product.ID}>
              <Product key={product.ID} product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          itemsCount={filterProduct.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
