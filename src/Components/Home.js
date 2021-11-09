import React, {useContext, useEffect } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { Products } from "./Products";
import { HeroMain } from "./common/HeroMain";
import { HomeProducts } from "./HomeProducts";
import { LoadingPage } from "./loading-page/LoadingPage";
import { Contact } from "./common/Contact";

export const Home = () => {
  const { spinner } = useContext(ProductsContext);

  return (
    <div className="container-fluid">
      <HeroMain />
      <div className="container">
        <h1></h1>
        {spinner && (
          <div>
            <LoadingPage />
          </div>
        )}
        {!spinner && (
          <div>
            <h1> Views Products</h1>
            <HomeProducts />
            <h1></h1>
            <Products />
            <h1></h1>
            <Contact />
            <h1></h1>
          </div>
        )}
      </div>
    </div>
  );
};
