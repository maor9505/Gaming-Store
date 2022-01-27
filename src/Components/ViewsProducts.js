import React, { useContext, useState } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { Link } from 'react-router-dom';
import '../styles/Product.css'
import { Pagination } from './common/Pagiantion'
import { paginate } from './common/paginat';
import { UserContext } from '../Global/UserContext';

export const ViewsProducts = () => {
    const { products } = useContext(ProductsContext);
    const [pageSize, setpageSize] = useState(3);
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

    return (
      <>
        {productsP.length !== 0 && <h1> Views Products</h1>}
        <div class="container d-flex justify-content-center">
          {productsP.length === 0 && <div>No Products To Display...</div>}
          {productsP.map((product) => (
            <div key={product.ID} class="col-xs-12 col-sm-6 col-md-4">
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
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            itemsCount={products.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePagechange}
          />
        </div>
      </>
    );
}
