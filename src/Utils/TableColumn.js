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
      path: "DateCreate",
      label: "Date Order:",
      content: (order) => <span>{order.DateCreate}</span>,
    },
    {
      path: "ID",
      label: "ID",
      content: (order) => (
        <Link
          to={{
            pathname: `/orders/${order.ID}`,
          }}
        >
          {order.ID}
        </Link>
      ),
    },
    {
      path: "ToTalPrice",
      label: "ToTal Price",
      content: (order) => <span>{order.TotalPrice}</span>,
    },
    {
      path: "ToTalQty",
      label: "ToTal Qty",
      content: (order) => <span>{order.ToTalQty}</span>,
    },
  ];
};
