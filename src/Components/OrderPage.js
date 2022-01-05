import React, {useEffect,useContext,useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import { db } from "../Config/Config";
import { OrderContext } from "../Global/OrderContext";
import { UserContext } from "../Global/UserContext";
import "../styles/OrderPage.css";
import { ToastAlert } from "../Utils/Toast";


export const OrderPage = () => {
  const {user}= useContext(UserContext);
const { orders } = useContext(OrderContext);
const [order, setOrder] = useState();
    const history = useHistory();

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
      const order = orders.find((order) => order.ID == id);
      console.log(order);
      setOrder(order)
  },[orders]);
 const CancleOrder =()=>{
   
        db.collection("Orders")
          .doc(user.uid + " Orders")
          .collection("OrderDetails")
          .doc(order.ID)
          .update({
            Status:'Order Cancled'
          })
          .then(() => {
            ToastAlert('Cancle Order Success')
          })
    
 }
  return (
    <div>
      {!order && <div class="top">slow internet...no order to display</div>}
      {order && (
        <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
          <div class="card">
            <div class="p-4">
              <div class="float-right">
                <h3 class="mb-0">Order-Number: {order.OrderID}</h3>
                Date-Order: {order.DateCreate}
              </div>
            </div>
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-sm-6 ">
                  <h5 class="mb-3">To:</h5>
                  <h3 class="text-dark mb-1">{order.ShippingAddress.name}</h3>
                  <div>{order.ShippingAddress.postalCode}</div>
                  <div>
                    {order.ShippingAddress.countryCode}{" "}
                    {order.ShippingAddress.locality}{" "}
                    {order.ShippingAddress.address1}
                  </div>
                  <div>Email: {user.email}</div>
                  <div>Phone: {user.phone}</div>
                </div>
              </div>
              <div class="table-responsive-sm">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th class="center">#</th>
                      <th>Item</th>
                      <th class="right">Price</th>
                      <th class="center">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.Products.map((p) => (
                      <tr key={p.ID}>
                        <td class="left strong">{p.ID}</td>
                        <td class="left">{p.ProductName}</td>
                        <td class="right">{p.ProductPrice}</td>
                        <td class="center">{p.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-lg-4 col-sm-5"></div>
                <div class="col-lg-4 col-sm-5 ml-auto">
                  <table class="table table-clear">
                    <tbody>
                      <tr>
                        <td class="left">
                          <strong class="text-dark">Total Price:</strong>{" "}
                        </td>
                        <td class="right">
                          <strong class="text-dark">{order.TotalPrice}</strong>
                        </td>
                        <td class="left">
                          <strong class="text-dark">Total Qty:</strong>{" "}
                        </td>
                        <td class="right">
                          <strong class="text-dark">{order.TotalQty}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {order.Status == "In Procces..." && (
                    <button
                      className="btn btn-outline-success  btn-lg mt-1  mb-2 float-left"
                      onClick={CancleOrder}
                    >
                      Cancle Order....
                    </button>
                  )}
                  {order.Status == "Order Cancled" && (
                    <h1>
                      {" "}
                      <span class="badge bg-light text-danger">
                        Order Cancled
                      </span>
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
