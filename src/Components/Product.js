import React from 'react'
import { Link } from "react-router-dom";
import "../styles/Product.css";

export const Product = ({product}) => {
  return (
        <div className="image-flip">
          <div className="mainflip flip-0">
            <Link
              className="nav-link text-dark img-wrap"
              to={`/products/${product.ID}`}
            >
              <div className="frontside">
                <div className="card ">
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
                    <p className="card-text">Price: {product.ProductPrice}$$</p>
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
                    <h4 className="card-title">{product.ProductName}</h4>
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
  );
}
