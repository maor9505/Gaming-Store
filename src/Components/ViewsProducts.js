import React, { useContext, useState } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { Link } from 'react-router-dom';
import '../styles/Product.css'
import { Pagination } from './common/Pagiantion'
import { paginate } from './common/paginat';
import { UserContext } from '../Global/UserContext';

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
      <div className='container'>

        {productsP.length !== 0 && <h1> Views Products</h1>}
        <hr/>
        <div className="row">
          {productsP.length === 0 && <div>No Products To Display...</div>}
          {productsP.map((product) => (
            <div key={product.ID} className="col-sm-12 col-sm-6 col-lg-3">
              <div className="image-flip">
                <div className="mainflip flip-0">
                  <Link
                    className="nav-link text-dark img-wrap"
                    to={`/products/${product.ProductID}`}
                  >
                    <div className="frontside">
                      <div className="card">
                        <div className="card-body text-center">
                          <p>
                            <img
                              className=" img-fluid"
                              src={product.ProductImg}
                              alt="card image"
                            />
                          </p>
                          <h4 className="card-title text-wrap">{product.ProductName}</h4>
                          <p className="card-text">{product.Catagory}</p>
                          <p className="card-text">
                            Price: {product.ProductPrice}$$
                          </p>
                          <p className="card-text">Views: {product.Views}</p>
                          <p className="card-text">Sales: {product.Sales}</p>

                          <span
                            href="https://www.fiverr.com/share/qb8D02"
                            className="btn btn-success btn-sm"
                          >
                            <i className="fa fa-plus"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="backside">
                      <div className="card">
                        <div className="card-body text-center mt-4  d-flex flex-column">
                          <h4 className="card-title">{product.ProductName}</h4>
                          <p className="card-text">{product.Description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
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
