import React, {useContext, useEffect,useState } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { Products } from "./Products";
import { HeroMain } from "./common/HeroMain";
import { HomeProducts } from "./HomeProducts";
import { LoadingPage } from "./loading-page/LoadingPage";
import { Contact } from "./common/Contact";
import { AdminOrderContext } from "../Global/AdminOrdersContext";

export const Home = () => {
  const { products, spinner } = useContext(ProductsContext);
   const { AllOrderUsers } = useContext(AdminOrderContext);
    // useEffect(() => {
    //   // setViewDashboard(<HomeView />);
    //   console.log("home");
    //   console.log(AllOrderUsers);
    // }, [AllOrderUsers]);

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
    </div>
  );
};
