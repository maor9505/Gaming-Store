import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { useParams, useHistory } from "react-router-dom";
import "../styles/ProductPage.css";
import { CartContext } from "../Global/CartContext";
import { HomeProducts } from "./HomeProducts";
import { UserContext } from "../Global/UserContext";
import { db } from "../Config/Config";

export const ProductPage = () => {
  const { user } = useContext(UserContext);

  const { dispatch } = useContext(CartContext);
  const { products } = useContext(ProductsContext);
  const [product, setproduct] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const product = products.find((product) => product.ID == id);
    setproduct(product);
  }, [products]);

  useEffect(() => {
    const p = products.find((element) => element.ID === id);
    if (p) {
      p.Views += 1;
      db.collection("Products").doc(id).update(p);
      setproduct(p);
    }
  }, [id]);

  const handlePage = () => {
    history.push("/login");
  };
  return (
    <>
      <>
        {!product && <div>slow internet...no products to display</div>}
        {product && (
          <div className="container">
            <div className="single_product">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 order-lg-2 order-1">
                    <div className="image_selected">
                      <img src={product.ProductImg} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 order-3">
                    <div className="product_description">
                      <div className="product-name">{product.ProductName}</div>
                      <hr className="singleline" />
                      <div>
                        <span className="product_price">
                          {" "}
                          Price: {product.ProductPrice}$
                        </span>
                      </div>
                      <hr className="singleline" />
                      <div>
                        <h3>Category:&ensp;{product.Catagory}</h3>
                        <hr className="singleline" />
                        <h3>
                          Age Category:&ensp;
                          {product.CatagoryAge == 1 ? "3-16" : "16-99"}
                        </h3>
                        <hr className="singleline" />
                        <h3>Description:&ensp;{product.Description}</h3>
                        <hr className="singleline" />
                        <h3>Views:&ensp;{product.Views}</h3>
                        <hr className="singleline" />
                        <h3>Sales:&ensp;{product.Sales}</h3>
                      </div>
                      {user && (
                        <button
                          className="btn btn-outline-success  btn-lg mt-3 float-left"
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
                      {!user && (
                        <button
                          className="btn btn-outline-success  btn-lg mt-3 float-left"
                          onClick={handlePage}
                        >
                          Sign In For Shooping...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <h1></h1>
      <div className="container">
        <h1>More Products...</h1>
        <HomeProducts />
      </div>
    </>
  );
};
