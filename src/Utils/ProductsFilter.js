export const ProductsFilter = (type, value) => {
  const { products } = useContext(ProductsFilter);
 let productFilter = [];
 switch (type) {
   case "Catagory":
     setCatagoryFilter(value);
     if (value != "0") {
       productFilter = products.filter((pro) => pro.Catagory == value);
       if (catagoryAgeFilter)
         productFilter = productFilter.filter(
           (pro) => pro.CatagoryAge == catagoryAgeFilter
         );
       if (priceFilter)
         productFilter = productFilter.filter(
           (pro) => pro.ProductPrice <= priceFilter
         );
     } else {
       setCatagoryFilter("");
       setCatagoryAgeFilter("");
       setpriceFilter("");
       productFilter = [...products];
     }
     break;
   case "Age":
     if (value != "0") {
       setCatagoryAgeFilter(value);
       if (catagoryFilter) {
         productFilter = products.filter(
           (pro) => pro.Catagory == catagoryFilter
         );
         productFilter = productFilter.filter(
           (pro) => pro.CatagoryAge == value
         );
         if (priceFilter)
           productFilter = productFilter.filter(
             (pro) => pro.ProductPrice <= priceFilter
           );
       } else {
         productFilter = products.filter((pro) => pro.CatagoryAge == value);
         if (priceFilter)
           productFilter = productFilter.filter(
             (pro) => pro.ProductPrice <= priceFilter
           );
       }
     } else {
       if (catagoryFilter) {
         productFilter = products.filter(
           (pro) => pro.Catagory == catagoryFilter
         );
         if (priceFilter)
           productFilter = productFilter.filter(
             (pro) => pro.ProductPrice <= priceFilter
           );
         setCatagoryAgeFilter("");
       } else {
         productFilter = [...products];
         setCatagoryFilter("");
         setCatagoryAgeFilter("");
       }
     }
     break;
   case "Price":
     setpriceFilter(value);
     if (catagoryFilter) {
       productFilter = products.filter((pro) => pro.Catagory == catagoryFilter);
       if (catagoryAgeFilter)
         productFilter = productFilter.filter(
           (pro) => pro.CatagoryAge == catagoryAgeFilter
         );
       if (value)
         productFilter = productFilter.filter(
           (pro) => pro.ProductPrice <= value
         );
     } else if (catagoryAgeFilter && !catagoryFilter) {
       productFilter = products.filter(
         (pro) => pro.CatagoryAge == catagoryAgeFilter
       );
       if (value)
         productFilter = productFilter.filter(
           (pro) => pro.ProductPrice <= value
         );
     } else if (value && !catagoryAgeFilter && !catagoryFilter) {
       productFilter = products.filter((pro) => pro.ProductPrice <= value);
     } else {
       productFilter = [...products];
     }
     break;
   default:
     productFilter = [...products];
 }
 return 
}
