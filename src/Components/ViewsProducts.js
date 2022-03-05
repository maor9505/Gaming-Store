import React, { useContext, useState } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { Link } from 'react-router-dom';
import '../styles/Product.css'
import { Pagination } from './common/Pagiantion'
import { paginate } from './common/paginat';
import { Product } from './Product';

export const ViewsProducts = () => {
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    //sort
    let sortProductsByviews = [...products]
    sortProductsByviews = sortProductsByviews.sort((a,b)=> b.Views - a.Views);
    const productsP = paginate(sortProductsByviews, currentPage, pageSize);
    // function the handle the page change
    const handlePagechange = page => {
        setcurrentPage(page);
    }

    return (
      <div className="container">
        {productsP.length !== 0 && (
          <h1 className="text-success"> Views Products</h1>
        )}
        <div className="row mt-4">
          {productsP.length === 0 && <div>No Products To Display...</div>}
          {productsP.map((product) => (
            <Product product={product} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            itemsCount={products.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePagechange}
          />
        </div>
      </div>
    );
}
