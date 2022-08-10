import _ from "lodash";
export const handelProductsDetails = (products) => {
  if (products.length > 0) {
    const totalProducts = products.length;
    const totalSales = _.sumBy(products, (o) => {
      return o.Sales;
    });
    const totalViews = products
      .map((product) => product.Views)
      .reduce((a, b) => a + b);
    const highestMaxView = _.maxBy(products, (o) => {
      return o.Views;
    });
    return {
      totalProducts: totalProducts,
      totalSales: totalSales,
      totalViews: totalViews,
      highestMaxView: highestMaxView.ProductName,
    };
  }
  return {};
};
