import React, { useContext,useState,useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext'
import { useHistory, Link} from 'react-router-dom';
import '../styles/Product.css';
import { db } from '../Config/Config'
import { Pagination } from './common/Pagiantion'
import { paginate } from './common/paginat';
import { HeaderProducts } from './common/HeaderProducts';
import { UserContext } from '../Global/UserContext';

export const Products = () => {
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [filterProduct, setFilterProduct] = useState([]);
    const productsP = paginate(filterProduct, currentPage, pageSize);
    
    // function the handle the page change
    const handlePagechange = page => {
        setcurrentPage(page);
    }


    return (
      <>
        <div className="container ">
          {productsP.length !== 0 && (
            <h1 className="text-success"> Products</h1>
          )}
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
              <div className="col-sm-3 col-md-6 " key={product.ID}>
                <div className="image-flip">
                  <div className="mainflip flip-0">
                    <Link
                      className="nav-link text-dark img-wrap"
                      to={`/products/${product.ID}`}
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
                            <h4 className="card-title text-wrap">
                              {product.ProductName}
                            </h4>
                            <p className="card-text">{product.Catagory}</p>
                            <p className="card-text">
                              Price: {product.ProductPrice}$$
                            </p>
                            <p className="card-text">Views: {product.Views}</p>
                            <p className="card-text">Sales: {product.Sales}</p>
                          </div>
                          <div className="card-footer  d-flex justify-content-center">
                            <span
                              href="https://www.fiverr.com/share/qb8D02"
                              className="btn btn-success btn-md  "
                            >
                              <i className="fa fa-info"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="backside">
                        <div className="card">
                          <div className="card-body text-center mt-4 d-flex flex-column">
                            <h4 className="card-title">
                              {product.ProductName}
                            </h4>
                            <p className="card-text">{product.Description}</p>
                          </div>
                          <div className="card-footer  d-flex justify-content-center">
                            <span
                              href="https://www.fiverr.com/share/qb8D02"
                              className="btn btn-success btn-md  "
                            >
                              <i className="fa fa-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            itemsCount={filterProduct.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePagechange}
          />
        </div>
      </>
    );
}
