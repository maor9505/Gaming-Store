
import React, { createContext, useReducer, useEffect,useState } from 'react'
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(CartReducer)

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}









