export  const getProduct=(doc)=>{
   return {
        ProductID: doc.id,
        ProductName: doc.data().ProductName,
        ProductPrice: doc.data().ProductPrice,
        ProductImg: doc.data().ProductImg,
        Description: doc.data().Description,
        Views: doc.data().Views,
        CatagoryAge: doc.data().CatagoryAge,
        Catagory: doc.data().Catagory,
         UplodeDate: doc.data().UplodeDate,
         DateCreate: doc.data().DateCreate
    }
}
