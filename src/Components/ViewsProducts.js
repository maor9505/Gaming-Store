import React, { useContext, useState } from 'react'
import { CartContext } from '../Global/CartContext'
import { ProductsContext } from '../Global/ProductsContext'
import { useHistory } from 'react-router-dom';
import '../styles/Product.css'
import { db } from '../Config/Config'
import { Pagination } from './Pagiantion'
import { paginate } from './paginat';

export const ViewsProducts = () => {
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    //sort
    let sortProductsByviews = [...products]
    sortProductsByviews = sortProductsByviews.sort((a,b)=> b.Views - a.Views);
    console.log('sort')
    console.log(sortProductsByviews)

    const productsP = paginate(sortProductsByviews, currentPage, pageSize);

    // function the handle the page change
    const handlePagechange = page => {
        setcurrentPage(page);
    }
    const { dispatch } = useContext(CartContext);
    const history = useHistory();

    const UpdateViewInDb = (product) => {
        product.Views += 1;
        db.collection('Products').doc(product.ProductID).update(product);
        history.push(`/products/${product.ProductID}`);

    }

    return (
        <>
            {productsP.length !== 0 && <h1>  Views Products</h1>}

            <div class="container d-flex justify-content-center">
                {productsP.length === 0 && <div>No Products To Display...</div>}
                {productsP.map(product => (

                    <figure class="card card-product-grid card-lg mt-4">
                        <a href="#" class="img-wrap" data-abc="true">
                            <img src={product.ProductImg} /> </a>
                        <figcaption class="info-wrap">
                            <div class="row">
                                <div class="col-md-9 col-xs-9"> <a  >{product.ProductName}</a><br /> <span class="rated">{product.Catagory}</span> </div>
                            </div>
                        </figcaption>
                        <div class="bottom-wrap-payment">
                            <figcaption class="info-wrap">
                                <div class="row">
                                    <div > <a >Price:  {product.ProductPrice}$$</a></div>
                                    <div class="rating "><span class="rated">Views:  </span><span class="rated">{product.Views}</span> </div>
                                </div>
                            </figcaption>
                        </div>
                        <div class="bottom-wrap">
                            <button onClick={() => UpdateViewInDb(product)} className='btn btn-outline-danger'>View</button>
                            <button className='btn btn-outline-success' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                        </div>
                    </figure>
                ))}
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <Pagination
                    itemsCount={products.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePagechange} />
            </div>
        </>
    )
}
