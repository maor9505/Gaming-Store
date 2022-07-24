import React, { useContext, useEffect} from "react";
import { NavBarDash } from "./NavBarDash";
import { AddProducts } from "./AddProducts";
import { AddCatagory } from "./AddCatagory";
import "react-pro-sidebar/dist/css/styles.css";
import { HomeView } from "./HomeView";
import { LoadingPage } from "../loading-page/LoadingPage";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { ProductsView } from "./ProductsView";
import { CatagoryView } from "./CatagoryView";
import { OrderView } from "./OrderView";
import {  MessagesView } from "./MessagesView";
import { UsersView } from "./UsersView";
import { Route } from "react-router-dom";

export const Dashboard = () => {
  const { spinner } = useContext(AdminOrderContext);

  return (
    <div>
        <h2>
          <span className="badge bg-light text-danger">Dashboard-Admin</span>
        </h2>
        <NavBarDash/>
        <div className="col">
          {spinner && (
            <div className="container">
              <LoadingPage />
            </div>
          )}
          {!spinner && (
            <div className="container justify-content-center ">
              <Route path="/dashboard" exact>
                <HomeView></HomeView>
              </Route>
              <Route path="/dashboard/products">
                <ProductsView></ProductsView>
              </Route>
              <Route path="/dashboard/add-product">
                <AddProducts></AddProducts>
              </Route>
              <Route path="/dashboard/catagory">
                <CatagoryView></CatagoryView>
              </Route>
              <Route path="/dashboard/add-catagory">
                <AddCatagory></AddCatagory>
              </Route>
              <Route path="/dashboard/orders">
                <OrderView></OrderView>
              </Route>
              <Route path="/dashboard/users">
                <UsersView></UsersView>
              </Route>
              <Route path="/dashboard/messages">
                <MessagesView></MessagesView>
              </Route>
            </div>
          )}
        </div>
      </div>
  );
};
