import React,{useContext,useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';

import '../styles/Product.css'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext';
import { UserContext } from '../Global/UserContext';


export const HomeProducts = () => {
     const { products} = useContext(ProductsContext);
     const [productsP, setproductsP] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
useEffect(() => {
  setproductsP([...products]);
}, [products]);

// sort by Views to Desc products views
useEffect(() => {
  let sortProductsByviews = productsP.sort((a, b) => b.Sales - a.Sales);
  sortProductsByviews = sortProductsByviews.slice(0, 4);
  setFilterProduct(sortProductsByviews);
}, [productsP]);


    return (
      <div className="row mt-3">
        {filterProduct.length === 0 && <div>No Products To Display...</div>}
        {filterProduct.map((product) => (
          <div key={product.ID} className="col-sm-12 col-sm-6 col-lg-3">
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
                        <h4 className="card-title">{product.ProductName}</h4>
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
    );
}
