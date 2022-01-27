import React,{useContext,useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';

import '../styles/Product.css'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext';
import { UserContext } from '../Global/UserContext';


export const HomeProducts = () => {
      const { user } = useContext(UserContext);
     const { products} = useContext(ProductsContext);
     const [productsP, setproductsP] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const { dispatch } = useContext(CartContext);
useEffect(() => {
  setproductsP([...products]);
}, [products]);

// sort by Views to Desc products views
useEffect(() => {
  let sortProductsByviews = productsP.sort((a, b) => b.Sales - a.Sales);
  sortProductsByviews = sortProductsByviews.slice(0, 3);
  setFilterProduct(sortProductsByviews);
}, [productsP]);


    return (
      <div class="container d-flex justify-content-center">
        {filterProduct.length === 0 && <div>No Products To Display...</div>}
        {filterProduct.map((product) => (
          <div  key={product.ID}class="col-xs-12 col-sm-6 col-md-4">
            <div class="image-flip">
              <div class="mainflip flip-0">
                <Link
                  class="nav-link text-dark img-wrap"
                  to={`/products/${product.ID}`}
                >
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src={product.ProductImg}
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">{product.ProductName}</h4>
                        <p class="card-text">{product.Catagory}</p>
                        <p class="card-text">Price: {product.ProductPrice}$$</p>
                        <p class="card-text">Views: {product.Views}</p>
                        <p class="card-text">Sales: {product.Sales}</p>

                        <span
                          href="https://www.fiverr.com/share/qb8D02"
                          class="btn btn-success btn-sm"
                        >
                          <i class="fa fa-plus"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4  d-flex flex-column">
                        <h4 class="card-title">{product.ProductName}</h4>
                        <p class="card-text">{product.Description}</p>
                       
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
