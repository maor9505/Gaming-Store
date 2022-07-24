import React, { useContext, useEffect, useMemo } from 'react'
import { CartContext } from '../Global/CartContext'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { useHistory,Link } from 'react-router-dom'
import {db} from '../Config/Config'
import '../styles/Cart.css'
import { GooglePay } from './common/GooglePay'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Global/UserContext'
import { ToastAlert } from '../Utils/Toast';
import axios from 'axios'


export const Cart = () => {
  const { user } = useContext(UserContext);
  const {cart, dispatch } = useContext(CartContext);
  const history = useHistory();

  // calc sum of products price
  const calcTotalSum = useMemo(() => {
    let sum = 0;
    cart.items.map((pro) => (sum += pro.ProductPrice * pro.qty));
    return sum;
  }, [cart]);

  // calc sum of products Qty
  const calcTotalQty = useMemo(() => {
    let sum = 0;
    cart.items.map((pro) => (sum += pro.qty));
    return sum;
  }, [cart]);


  // after user complete the order and payment accepted uplode to db
  const handleOrderToDb = async(paymentRequest) => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const orderDetails = {
      UserID: user.uid,
      Products: cart.items,
      TotalPrice: calcTotalQty,
      TotalQty: calcTotalQty,
      ShippingAddress: paymentRequest.shippingAddress,
      DateCreate: date,
      DateTime: time,
      Status: "In Process...",
    };
    try{
      const res=  await axios.post('/order/orderPayment',{uid:user.uid, orderDetails:orderDetails,cart:cart});
         dispatch({ type: "Set_Data", data: [] });
       ToastAlert("Order Success");
         history.push("/orders");
    }catch (err){
      ToastAlert(err);
    }
  };

  return (
    <>
      <div className="cart-container">
        {cart.length !== 0 && <h1 className="text-success">Cart</h1>}

        {cart.length === 0 && (
          <>
            <div>
              no items in your cart or slow internet causing trouble (Refresh
              the page) or you are not logged in
            </div>
            <div>
              <Link to="/">Return to Home page</Link>
            </div>
          </>
        )}
        {cart &&
          cart.items.map((product) => (
            <div className="cart-card" key={product.ID}>
              <div className="cart-img">
                <img src={product.ProductImg} alt="not found" />
              </div>
              <div>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={{ pathname: `/products/${product.ID}` }}
                >
                  {product.ProductName}
                </Link>
              </div>

              <div className="cart-price-orignal">
                Rs {product.ProductPrice}.00
              </div>

              <div
                className="inc"
                onClick={() =>
                  dispatch({ type: "INC", id: product.ID, product })
                }
              >
                <Icon icon={ic_add} size={24} />
              </div>

              <div className="quantity">{product.qty}</div>

              <div
                className="dec"
                onClick={() =>
                  dispatch({ type: "DEC", id: product.ID, product })
                }
              >
                <Icon icon={ic_remove} size={24} />
              </div>

              <div className="cart-price">
                Rs {product.ProductPrice * product.qty}.00
              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch({ type: "DELETE", id: product.ID, product })
                }
              >
                <Icon icon={iosTrashOutline} size={24} />
              </button>
            </div>
          ))}
        {cart.items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary-heading">Cart-Summary</div>
            <div className="cart-summary-price">
              <span>Total Price</span>
              <span>{calcTotalSum}</span>
            </div>
            <div className="cart-summary-price">
              <span>Total Qty</span>
              <span>{calcTotalQty}</span>
            </div>
            <div className="GooglePay">
              <GooglePay
                totalP={calcTotalSum}
                handleOrderToDb={handleOrderToDb}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}