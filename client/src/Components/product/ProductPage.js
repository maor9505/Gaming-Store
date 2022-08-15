import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Global/ProductsContext";
import { useParams, useHistory } from "react-router-dom";
import { CartContext } from "../../Global/CartContext";
import { HomeProducts } from "./HomeProducts";
import { UserContext } from "../../Global/UserContext";
import { db } from "../../Config/Config";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastAlert } from "../../Utils/Toast";
export const ProductPage = () => {
  const { user } = useContext(UserContext);
  const { cart,dispatch } = useContext(CartContext);
  const { products } = useContext(ProductsContext);
  const [product, setProduct] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const p = products.find((element) => element.ID === id);
    if (p) {
      p.Views += 1;
      db.collection("Products").doc(id).update(p);
      setProduct(p);
    }
  }, [id]);
  const addProductInCart = async (product) => {
    const isFind = cart.items.find((pro) => pro.ID == product.ID);
    if (product.MaxQty > 0 && !isFind) {
      product["qty"] = 1;
   try {
     const res = await axios.post("/cart/addProductToCart", {
       uid: user.uid,
       product: product,
     });
     dispatch({
       type: "ADD_TO_CART",
       id: product.ProductID,
       product,
     });
   } catch (err) {
     console.log(err);
   }
    } else {
      ToastAlert(
        isFind ? "already in your cart..." : "This Product Is Out Of Stock"
      );
    }
   
  };

  const handlePage = () => {
    history.push("/login");
  };
  return (
    <>
      <>
        {!product && <div>slow internet...no products to display</div>}
        {product && (
          <div className="container mt-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 ">
                <div className="">
                  <img className="img-fluid" src={product.ProductImg} alt="" />
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="">
                  <div className="fs-2">{product.ProductName}</div>
                  <hr />
                  <div>
                    <h3> Price:&ensp;{product.ProductPrice}$</h3>
                  </div>
                  <hr />
                  <div>
                    <h3>Category:&ensp;{product.Catagory}</h3>
                    <hr />
                    <h3>
                      Age Category:&ensp;
                      {product.CatagoryAge === 1 ? "3-16" : "16-99"}
                    </h3>
                    <hr />
                    <h3>Description:&ensp;{product.Description}</h3>
                    <hr />
                    <h3>Views:&ensp;{product.Views}</h3>
                    <hr />
                    <h3>Sales:&ensp;{product.Sales}</h3>
                  </div>
                </div>
                <div className="container d-flex justify-content-center ">
                  {user && (
                    <button
                      className="btn btn-outline-success  btn-lg mt-3 float-left"
                      onClick={() => addProductInCart(product)}
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
