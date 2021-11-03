export const getOrder = (doc) => {
  return {
    OrderID: doc.id,
    DateCreate: doc.data().DateCreate.toDate().toString(),
    TotalPrice: doc.data().TotalPrice,
    TotalQty: doc.data().TotalQty,
    Products: doc.data().Products,
    ShippingAddres: doc.data().ShippingAddres,
    UserID: doc.data().UserID,
    Status: doc.data().Status,
  };
};
