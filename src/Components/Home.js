import React, { useState, useContext,useEffect } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import {Products}  from './Products'
import {HeroMain} from './common/HeroMain'
import { HomeProducts } from './HomeProducts'
import { LoadingPage } from './loading-page/LoadingPage'


export const Home = () => {

    const {spinner } = useContext(ProductsContext);

    return (
        <div>
            <HeroMain/>
            <div>
            <div className='container'>
                <h1></h1>
                {spinner && <div><LoadingPage /></div>}
                {!spinner && <div>
                <h1> Views Products</h1>
                <HomeProducts />
                <h1></h1>
                {/* //Order */}
                <Products  />
                </div>}
            </div>
            </div>
        </div>
    
    )
}
