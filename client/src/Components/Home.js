import React, {useContext} from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { Products } from "./product/Products";
import { HeroMain } from "./common/HeroMain";
import { HomeProducts } from "./product/HomeProducts";
import { LoadingPage } from "./loading-page/LoadingPage";
import { Contact } from "./common/Contact";

export const Home = () => {
  const {spinner } = useContext(ProductsContext);

  return (
    <>
      <div className="container-fluid">
        <HeroMain />
        <br />
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
            <section>
              <h1 className="text-success">Best-Selling Products</h1>
              <br/>
              <HomeProducts />
            </section>
            <section>
              <Products />
            </section>
            <section>
              <Contact />
            </section>
          </div>
        )}
      </div>
    </>
  );
};
