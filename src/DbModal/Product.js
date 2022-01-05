import { db } from "../Config/Config";

export const getProduct = (doc) => {
  return {
    ID: doc.id,
    ProductName: doc.data().ProductName,
    ProductPrice: doc.data().ProductPrice,
    ProductImg: doc.data().ProductImg,
    Description: doc.data().Description,
    Views: doc.data().Views,
    Sales: doc.data().Sales,
    CatagoryAge: doc.data().CatagoryAge,
    Catagory: doc.data().Catagory,
    UplodeDate: doc.data().UplodeDate,
    DateCreate: doc.data().DateCreate,
  };
};
