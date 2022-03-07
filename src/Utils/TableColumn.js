import { Link } from "react-router-dom";
import React
 from "react";

import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline"
import { db} from "../Config/Config";
import { Icon } from "react-icons-kit"
import { EditProductModal } from "../Components/admin/EditProductModal";
import { ToastAlert } from "./Toast";


export const ProductColumn = () => {
   const DeleteProduct = (product) => {
     db.collection("Products")
       .doc(product.ID)
       .delete().then(()=>{
         ToastAlert("Product Delete")
       })
       
   };
   
  return [
    {
      path: "ProductImg",
      label: "#",
      content: (product) => (
        <img
          src={product.ProductImg}
          alt={product.ProductName}
          className="photo"
        />
      ),
    },
    {
      path: "ProductName",
      label: "Product Name",
      content: (product) => (
        <Link
          to={{
            pathname: `/products/${product.ID}`,
          }}
        >
          {product.ProductName}
        </Link>
      ),
    },
    {
      path: "category.name",
      label: "Category",
      content: (product) => <span>{product.Catagory}</span>,
    },
    {
      path: "ProductPrice",
      label: "Price",
      content: (product) => <span>{product.ProductPrice}</span>,
    },
    {
      path: "",
      label: "Total Qty",
      content: (product) => <span>{product.MaxQty}</span>,
    },
    {
      path: "Sales",
      label: "Sales",
      content: (product) => <span>{product.Sales}</span>,
    },
    {
      path: "MaxQty",
      label: "Qty Left",
      content: (product) => {
        if (product.MaxQty >= 20)
          return (
            <span className="text-success">
              {product.MaxQty - product.Sales}
            </span>
          );
        else if (product.MaxQty >= 10)
          return (
            <span className="text-warning">
              {product.MaxQty - product.Sales}
            </span>
          );
        else if (product.MaxQty < 10)
          return (
            <span className="text-danger">
              {product.MaxQty - product.Sales}
            </span>
          );
      },
    },
    {
      path: "Views",
      label: "Views",
      content: (product) => <span>{product.Views}</span>,
    },
    {
      path: "Delete",
      label: "",
      content: (product) => (
        <button className="delete-btn" onClick={() => DeleteProduct(product)}>
          <Icon icon={iosTrashOutline} size={24} />
        </button>
      ),
    },
    {
      path: "Edit",
      label: "",
      content: (product) => <EditProductModal product={product} />,
    },
  ];
};

export const OrdersColumn = () => {
  return [
    {
      path: "ID",
      label: "Order ID",
      content: (order) => (
        <Link
          to={{
            pathname: `/OrderPage/${order.ID}`,
          }}
        >
          {order.ID}
        </Link>
      ),
    },
    {
      path: "DateCreate",
      label: "Date Order:",
      content: (order) => (
        <span>{new Date(order.DateCreate).toLocaleString("en-GB")}</span>
      ),
    },
    {
      path: "TotalPrice",
      label: "Total Price",
      content: (order) => <span>{order.TotalPrice}</span>,
    },
    {
      path: "TotalQty",
      label: "Total Qty",
      content: (order) => <span>{order.TotalQty}</span>,
    },
    {
      path: "Status",
      label: "Status",
      content: (order) =>
        order.Status == "Order Cancled" ? (
          <span className="text-danger" >
            {order.Status}
          </span>
        ) : (
          <span className="text-primary" >
            {order.Status}
          </span>
        ),
    },
  ];
};
export const CatagoryColumn = () => {
   const DeleteCatagory = (catagory) => {
     db.collection("Catagories").doc(catagory.ID).delete();
   };
   

  return [
    {
      path: "ID",
      label: "ID",
      content: (catagory) => <span>{catagory.ID}</span>,
    },
    {
      path: "catagory",
      label: "Catagory Name",
      content: (catagory) => <span>{catagory.Catagory_Name}</span>,
    },
    {
      path: "",
      label: "",
      content: (catagory) => (
        <button className="delete-btn" onClick={() => DeleteCatagory(catagory)}>
          <Icon icon={iosTrashOutline} size={24} />
        </button>
      ),
    },
  ];
};
export const UsersColumn = () => {
  
  const DeleteUser = (user) => {
    db.collection("users").doc(user.ID).delete()
  };

  return [
    {
      path: "ID",
      label: "ID",
      content: (catagory) => <span>{catagory.ID}</span>,
    },
    {
      path: "name",
      label: "Full-Name",
      content: (user) => <span>{user.DisplayName}</span>,
    },
    {
      path: "email",
      label: "Email",
      content: (user) => <span>{user.Email}</span>,
    },
    {
      path: "phone",
      label: "Phone-Number",
      content: (user) => <span>{user.PhoneNumber}</span>,
    },
    {
      path: "",
      label: "",
      content: (user) => (
        <button className="delete-btn" onClick={() => DeleteUser(user)}>
          <Icon icon={iosTrashOutline} size={24} />
        </button>
      ),
    },
  ];
};

export const OrdersAdminColumn = () => {
  //update Status Order in db
  const updateStatusOrder = (order) => {
    if (order.Status != "Order Cancled") {
      db.collection("Orders")
        .doc(order.UserID)
        .collection("OrderList")
        .doc(order.ID)
        .update({
          Status: "Order Was accepted and delivered",
        });
    }
  };
  return [
    {
      path: "UserID",
      label: "User-ID",
      content: (order) => <span>{order.UserID}</span>,
    },
    {
      path: "ID",
      label: "Order ID",
      content: (order) => (
        <Link
          to={{
            pathname: `/OrderPage/${order.ID}`,
          }}
        >
          {order.ID}
        </Link>
      ),
    },
    {
      path: "DateCreate",
      label: "Date Order:",
      content: (order) => (
        <span>{new Date(order.DateCreate).toLocaleString("en-GB")}</span>
      ),
    },
    {
      path: "TotalPrice",
      label: "Total Price",
      content: (order) => <span>{order.TotalPrice}</span>,
    },
    {
      path: "TotalQty",
      label: "Total Qty",
      content: (order) => <span>{order.TotalQty}</span>,
    },
    {
      path: "Status",
      label: "Status",
      content: (order) =>
        order.Status == "Order Cancled" ? (
          <span className="text-danger">{order.Status}</span>
        ) : (
          <span className="text-primary">{order.Status}</span>
        ),
    },
    {
      path: "",
      label: "",
      content: (order) =>
        order.Status == "Order Was accepted and delivered" ? (
          <button
            className="fa fa-list-alt btn-outline-success"
            onClick={() => updateStatusOrder(order)}
          ></button>
        ) : (
          <button
            className="fa fa-list-alt btn-outline-danger"
            onClick={() => updateStatusOrder(order)}
          ></button>
        ),
    },
  ];
};