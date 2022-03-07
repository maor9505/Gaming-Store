import React,{useContext,useState,useEffect} from 'react'
import '../styles/Product.css'
import { ProductsContext } from '../Global/ProductsContext';
import { Product } from './Product';


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
          <div key={product.ID} className="col-md-6 col-lg-3">
           <Product product={product}/>
          </div>
        ))}
      </div>
    );
}
