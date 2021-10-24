import React, { useState, useContext,useEffect } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import {Products}  from './Products'
import {HeroMain} from './common/HeroMain'
import { HomeProducts } from './HomeProducts'
import { LoadingPage } from './loading-page/LoadingPage'


export const Home = () => {

    const { products,spinner } = useContext(ProductsContext);
    const [filterProduct, setFilterProduct] = useState([...products]);
    //sort
    let sortProductsByviews = filterProduct.sort((a, b) => b.Views - a.Views);
     sortProductsByviews = sortProductsByviews.slice(0, 4);

    return (
        <div>
            <HeroMain/>
            <div>
            <div className='container'>
                <h1></h1>
                {spinner && <div><LoadingPage /></div>}
                {!spinner && <div>
                <h1> Views Products</h1>
                <HomeProducts products={sortProductsByviews}/>
                <h1></h1>
                {/* //Order */}
                <Products products={products} />
                </div>}
            </div>
            </div>
        </div>
    
    )
}
