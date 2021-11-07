import React,{useContext,useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';

import '../styles/Product.css'
import { CartContext } from '../Global/CartContext'
import { db } from '../Config/Config'
import { ProductsContext } from '../Global/ProductsContext';


export const HomeProducts = () => {
     const { products} = useContext(ProductsContext);
     const [productsP, setproductsP] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    // let sortProductsByviews = filterProduct.sort((a, b) => b.Views - a.Views);
    //  sortProductsByviews = sortProductsByviews.slice(0, 4);
    const { dispatch } = useContext(CartContext);
    const history = useHistory();

useEffect(() => {
    setproductsP([...products]);
}, [products]);

useEffect(() => {
  let sortProductsByviews = productsP.sort((a, b) => b.Views - a.Views);
  sortProductsByviews = sortProductsByviews.slice(0, 4);
  setFilterProduct(sortProductsByviews);
}, [productsP]);


    const UpdateViewInDb = (product) => {
        product.Views += 1;
        db.collection('Products').doc(product.ProductID).update(product);
        history.push(`/products/${product.ProductID}`);

    }

    return (
      <div class="container d-flex justify-content-center">
        {filterProduct.length === 0 && <div>No Products To Display...</div>}
        {filterProduct.map((product) => (
          <figure class="card card-product-grid card-lg mt-4">
            <a href="#" class="img-wrap" data-abc="true">
              <img src={product.ProductImg} />{" "}
            </a>
            <figcaption class="info-wrap">
              <div class="row">
                <div class="col-md-9 col-xs-9">
                  {" "}
                  <a>{product.ProductName}</a>
                  <br /> <span class="rated">{product.Catagory}</span>{" "}
                </div>
              </div>
            </figcaption>
            <div class="bottom-wrap-payment">
              <figcaption class="info-wrap">
                <div class="row">
                  <div>
                    {" "}
                    <a>Price: {product.ProductPrice}$$</a>
                  </div>
                  <div class="rating ">
                    <span class="rated">Views: </span>
                    <span class="rated">{product.Views}</span>{" "}
                  </div>
                </div>
              </figcaption>
            </div>
            <div class="bottom-wrap">
              <button
                onClick={() => UpdateViewInDb(product)}
                className="btn btn-outline-danger"
              >
                View
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    id: product.ProductID,
                    product,
                  })
                }
              >
                ADD TO CART
              </button>
            </div>
          </figure>
        ))}
      </div>
    );
}
