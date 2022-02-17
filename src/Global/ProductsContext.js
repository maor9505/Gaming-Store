import React, { createContext,useEffect,useState,useReducer } from 'react'
import { db } from '../Config/Config'
import {getProduct} from '../DbModal/Product'
import _ from 'lodash'
export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [spinner, setSpinner] = useState(true);

    useEffect(() => { 
     const getP = () => {
       let prevProducts = [];
        db.collection("Products").onSnapshot((snapshot) => {
           snapshot.docChanges().forEach((change) => {
             if (change.type === "added") {
               prevProducts.push(getProduct(change.doc));
             }
             if (change.type === "modified") {
               _.remove(prevProducts, { ID: change.doc.id });
               prevProducts.push(getProduct(change.doc));
             }
             setProducts([...prevProducts]);
           });
         setSpinner(false);
       })
     };
     getP();
     
    },[])

   
    return (
      <ProductsContext.Provider
        value={{
          products: [...products],
          spinner: spinner,
        }}
        
      >
        {props.children}
      </ProductsContext.Provider>
    );
}
 