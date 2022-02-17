import React, {useContext} from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { Products } from "./Products";
import { HeroMain } from "./common/HeroMain";
import { HomeProducts } from "./HomeProducts";
import { LoadingPage } from "./loading-page/LoadingPage";
import { Contact } from "./common/Contact";

export const Home = () => {
  const {spinner } = useContext(ProductsContext);

  return (
    <>
      <div className="container-fluid">
        <HeroMain />
        <br/>
      </div>
      <div className="container">
        <h1></h1>
        {spinner && (
          <div className="container">
            <LoadingPage />
          </div>
        )}
        {!spinner && (
          <div className="container">
            <h1> Sales Products</h1>
            <HomeProducts />
            <h1></h1>
            <Products />
            <h1></h1>
            <Contact />
            <h1></h1>
          </div>
        )}
      </div>
    </>
  );
};
