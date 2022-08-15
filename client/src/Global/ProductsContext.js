import React, { createContext,useEffect,useState, useCallback, useMemo } from 'react'
import _ from 'lodash'
import axios from 'axios';
export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [spinner, setSpinner] = useState(true);

    useEffect(() => { 
      getAllProducts();
    },[])

     const getAllProducts = async ()=>{
      try{
        const result = await axios.get("/products/getProducts");
        console.log("products data");
        console.log(result.data.products);
         setProducts(result.data.products)
         setSpinner(false)
      }
      catch(err){
      console.log(err);
      }
     }
    
    return (
      <ProductsContext.Provider
        value={{
          products: [...products],
          setProducts:setProducts,
          spinner: spinner,
        }}
        
      >
        {props.children}
      </ProductsContext.Provider>
    );
}
 