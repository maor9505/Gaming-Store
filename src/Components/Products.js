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
      const { user } = useContext(UserContext);
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(3);
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
          <div class="container d-flex justify-content-center">
            {productsP.map((product) => (
              <div class="col-xs-12 col-xs-6 col-md-4 ">
                <div class="image-flip">
                  <div class="mainflip flip-0">
                    <Link
                      class="nav-link text-dark img-wrap"
                      to={`/products/${product.ProductID}`}
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
                            <p class="card-text">
                              Price: {product.ProductPrice}$$
                            </p>
                            <p class="card-text">Views: {product.Views}</p>

                            <a
                              href="https://www.fiverr.com/share/qb8D02"
                              class="btn btn-success btn-sm"
                            >
                              <i class="fa fa-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4 d-flex flex-column">
                            <h4 class="card-title">{product.ProductName}</h4>
                            <p class="card-text">{product.Description}</p>
                            {user && (

                              <button
                                className="btn btn-outline-danger mt-auto "
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
                            )}
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
