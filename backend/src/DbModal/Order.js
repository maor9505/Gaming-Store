
export const getOrder = (doc) => {
  return {
    ID: doc.id,
    DateCreate: doc.data().DateCreate,
    TotalPrice: doc.data().TotalPrice,
    TotalQty: doc.data().TotalQty,
    Products: doc.data().Products,
    ShippingAddress: doc.data().ShippingAddress,
    UserID: doc.data().UserID,
    Status: doc.data().Status,
  };
};
