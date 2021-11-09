import React, { useContext,useState,useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext'
import { useHistory} from 'react-router-dom';
import '../styles/Product.css';
import { db } from '../Config/Config'
import { Pagination } from './common/Pagiantion'
import { paginate } from './common/paginat';
import { HeaderProducts } from './common/HeaderProducts';

export const Products = () => {
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [filterProduct, setFilterProduct] = useState([]);
    const [priceFilter, setpriceFilter] = useState();
    const [catagoryFilter, setCatagoryFilter] = useState("");
    const [catagoryAgeFilter, setCatagoryAgeFilter] = useState("");
    const productsP = paginate(filterProduct, currentPage, pageSize);
    const { dispatch } = useContext(CartContext);
    const history = useHistory();
useEffect(() => {
   setFilterProduct([...products])
}, [products])

    // function the handle the page change
    const handlePagechange = page => {
        setcurrentPage(page);
    }
    const UpdateViewInDb = (product) => {
        product.Views += 1;
        db.collection('Products').doc(product.ProductID).update(product);
        history.push(`/products/${product.ProductID}`);

    }
 const hanldeChangeFilterOption=(type,value)=>{
     let productFilter = [];
     switch(type){
         case 'Catagory':
             setCatagoryFilter(value);
             if (value != '0') {
                 productFilter = products.filter(pro => pro.Catagory == value)
                 if (catagoryAgeFilter)
                     productFilter = productFilter.filter(pro => pro.CatagoryAge == catagoryAgeFilter)
                 if (priceFilter)
                     productFilter = productFilter.filter(pro => pro.ProductPrice <= priceFilter)
             }
             else {
                 setCatagoryFilter("")
                 setCatagoryAgeFilter("")
                 setpriceFilter("")
                 productFilter = [...products]
             }
            break;
         case 'Age':
             if (value != '0') {
                 setCatagoryAgeFilter(value)
                 if (catagoryFilter) {
                     productFilter = products.filter(pro => pro.Catagory == catagoryFilter)
                     productFilter = productFilter.filter(pro => pro.CatagoryAge == value)
                     if (priceFilter)
                         productFilter = productFilter.filter(pro => pro.ProductPrice <= priceFilter)
                 }
                 else {
                     productFilter = products.filter(pro => pro.CatagoryAge == value)
                     if (priceFilter)
                         productFilter = productFilter.filter(pro => pro.ProductPrice <= priceFilter)
                 }
             }
             else {
                 if (catagoryFilter) {
                     productFilter = products.filter(pro => pro.Catagory == catagoryFilter)
                     if (priceFilter)
                         productFilter = productFilter.filter(pro => pro.ProductPrice <= priceFilter)
                     setCatagoryAgeFilter("")
                 }
                 else {
                     productFilter = [...products]
                     setCatagoryFilter("")
                     setCatagoryAgeFilter("")
                 }

             }
             break;
         case 'Price':
             setpriceFilter(value)
             if (catagoryFilter) {
                 productFilter = products.filter(pro => pro.Catagory == catagoryFilter)
                 if (catagoryAgeFilter)
                     productFilter = productFilter.filter(pro => pro.CatagoryAge == catagoryAgeFilter)
                 if (value)
                     productFilter = productFilter.filter(pro => pro.ProductPrice <= value)
             }
             else if (catagoryAgeFilter && !catagoryFilter) {
                 productFilter = products.filter(pro => pro.CatagoryAge == catagoryAgeFilter)
                 if (value)
                     productFilter = productFilter.filter(pro => pro.ProductPrice <= value)
             }
             else if (value && !catagoryAgeFilter && !catagoryFilter) {
                 productFilter = products.filter(pro => pro.ProductPrice <= value)

             } else {
                 productFilter = [...products]

             }
             break;
         default:
             productFilter = [...products]

     }
     setFilterProduct(productFilter)

 }
    return (
      <>
        {productsP.length !== 0 && <h1> Products</h1>}
        <div class="container">
          <HeaderProducts hanldeChangeFilterOption={hanldeChangeFilterOption} />
        </div>

        <div class="container d-flex justify-content-center">
          {productsP.length === 0 && (
            <div>
              No Products To Display...Or your opttion search id not Correct
            </div>
          )}
          {productsP.map((product) => (
            <figure class="card card-product-grid card-lg mt-4">
              <a href="#" class="img-wrap" data-abc="true">
                <img src={product.ProductImg} />{" "}
              </a>
              <figcaption class="info-wrap">
                <div class="row">
                  <div class="col-md-9 col-xs-9">
                    {" "}
                    <a className="rated">{product.ProductName}</a>
                    <br />
                    <span>{product.Catagory}</span>{" "}
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
                      <span>{product.Views}</span>{" "}
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
