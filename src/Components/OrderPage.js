import React, { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../Config/Config";
import { AdminOrderContext } from "../Global/AdminOrdersContext";
import { OrderContext } from "../Global/OrderContext";
import { UserContext } from "../Global/UserContext";
import "../styles/OrderPage.css";
import { ToastAlert } from "../Utils/Toast";

export const OrderPage = () => {
  const { user } = useContext(UserContext);
  const { AllOrderUsers } = useContext(AdminOrderContext);
  const { orders } = useContext(OrderContext);
  const [order, setOrder] = useState();
  const { id } = useParams();
  const history = useHistory();

  // find the order by id param
  useEffect(() => {
    let order;
    if (user) {
      if (user.type === "admin") {
        order = AllOrderUsers.find((order) => order.ID === id);
      } else {
        order = orders.find((order) => order.ID === id);
      }
    } else {
      history.push("/");
    }
    console.log(order);
    setOrder(order);
  },[id]);

  // update order to cancle Status
  const CancleOrder = () => {
    db.collection("Orders")
      .doc(order.UserID)
      .collection("OrderList")
      .doc(order.ID)
      .update({
        Status: "Order Cancled",
      })
      .then(() => {
        ToastAlert("Cancle Order Success");
        document.getElementById("btnCancle").textContent = "Order Cancled";
        document.getElementById("btnCancle").style.color = 'red';
        document.getElementById('btnCancle').style.backgroundColor='white'
        document.getElementById("btnCancle").style.borderColor = 'gray';
        order.Status = "Order Cancled";
      });
  };
  return (
    <div>
      {!order && <div className="top">slow internet...no order to display</div>}
      {order && (
        <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
          <div className="card">
            <div className="p-4">
              <div className="float-right">
                <h3 className="mb-0">Order-Number: {order.ID}</h3>
                Date-Order: {new Date(order.DateCreate).toLocaleString("en-GB")}
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-sm-6 ">
                  <h5 className="mb-3">To:</h5>
                  <h3 className="text-dark mb-1">
                    {order.ShippingAddress.name}
                  </h3>
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
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Item</th>
                      <th className="right">Price</th>
                      <th className="center">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.Products.map((p) => (
                      <tr key={p.ID}>
                        <td className="left strong">{p.ID}</td>
                        <td className="left">{p.ProductName}</td>
                        <td className="right">{p.ProductPrice}</td>
                        <td className="center">{p.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"></div>
                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong className="text-dark">Total Price:</strong>{" "}
                        </td>
                        <td className="right">
                          <strong className="text-dark">
                            {order.TotalPrice}
                          </strong>
                        </td>
                        <td className="left">
                          <strong className="text-dark">Total Qty:</strong>{" "}
                        </td>
                        <td className="right">
                          <strong className="text-dark">
                            {order.TotalQty}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center">
                    {order.Status === "In Procces..." && (
                      <button
                        id="btnCancle"
                        className="btn btn-outline-success  btn-lg mt-1  mb-2 float-left"
                        onClick={CancleOrder}
                      >
                        Cancle Order....
                      </button>
                    )}
                    {order.Status === "Order Cancled" && (
                      <h1>
                        {" "}
                        <span className="badge bg-light text-danger">
                          Order Cancled
                        </span>
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
