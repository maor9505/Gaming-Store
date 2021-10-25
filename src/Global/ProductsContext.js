import React, { createContext,useEffect,useState } from 'react'
import { db } from '../Config/Config'
import { getProduct } from '../DbModal/Product';
export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const prevProducts = [];
        db.collection('Products').onSnapshot(snapshot => {
            snapshot.docs.map( (doc) => (
                    prevProducts.push(getProduct(doc))
            ))
                setProducts(prevProducts)
                setSpinner(false);
            })
    }, [])

    return (
        <ProductsContext.Provider value={{ products: [...products],spinner:spinner }}>
            {props.children}
        </ProductsContext.Provider>
    )
}