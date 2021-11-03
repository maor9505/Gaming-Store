import { Link } from "react-router-dom";

export const ProductColumn = () => {
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
            pathname: `/products/${product.ProductID}`,
          }}
        >
          {product.ProductName}
        </Link>
      ),
    },
    { path: "category.name", label: "Category" },
  ];
};



export const OrdersColumn = () => {
  return [
    {
      path: "OrderID",
      label: "Order ID",
      content: (order) => (
        <Link
          to={{
            pathname: `/orders/${order.OrderID}`,
          }}
        >
          {order.OrderID}
        </Link>
      ),
    },
    {
      path: "DateCreate",
      label: "Date Order:",
      content: (order) => <span>{order.DateCreate}</span>,
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
      content: (order) => <span>{(!order.Status)? ' In Process': 'On the way'}</span>,
    },
  ];
};
