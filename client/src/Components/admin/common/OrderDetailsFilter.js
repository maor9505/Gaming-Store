
export const handelOrdersDetails = (AllOrderUsers) => {
  if (AllOrderUsers.length > 0) {
    const totalOrders = AllOrderUsers.length;
    const incomeTotal = AllOrderUsers.map(
      (order) => order.TotalPrice
    ).reduce((a, b) => a + b);
    const waitOrdersArr = [...AllOrderUsers];
    const waitOrders = waitOrdersArr.filter(
      (item) => item.Status === "In Process..."
    );
    const cancelOrderArr = [...AllOrderUsers];
    const cancelOrders = cancelOrderArr.filter(
      (item) => item.Status === "Order Cancels"
    );
    return {
      totalOrders,
      incomeTotal,
      waitOrders:waitOrders.length,
      cancelOrders:cancelOrderArr.length,
    };
  }
  return {};
};