import { Link } from "react-router-dom";
import React
 from "react";

import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline"
import { db } from "../Config/Config";
import { Icon } from "react-icons-kit"
import { EditProductModal } from "../Components/admin/EditProductModal";


export const ProductColumn = () => {
   const DeleteProduct = (product) => {
     db.collection("Products")
       .doc(product.ProductID)
       .delete()
       
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
      path: "Views",
      label: "Views",
      content: (product) => <span>{product.Views}</span>,
    },
    {
      path: "",
      label: "",
      content: (product) => (
        <button className="delete-btn" onClick={() => DeleteProduct(product)}>
          <Icon icon={iosTrashOutline} size={24} />
        </button>
      ),
    },
    {
      path: "",
      label: "",
      content: (product) => (
        <EditProductModal product={product}/>
      ),
    },
  ];
};

export const OrdersColumn = () => {

   const updateStatusOrder = (order) => {
     db.collection("Orders")
       .doc(order.UserID + " Orders")
       .collection("OrderDetails")
       .doc(order.ID)
       .update({
         Status: "Order Was accepted and delivered",
       });
   };
  return [
    {
      path: "UserID",
      label: "User ID",
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
          <span class="text-danger">{order.Status}</span>
        ) : (
          <span class="text-primary">{order.Status}</span>
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