import React, { useContext, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { AddProducts } from "./AddProducts";
import { AddCatagory } from "./AddCatagory";
import "react-pro-sidebar/dist/css/styles.css";
import { Products } from "../Products";
import { HomeView } from "./HomeView";
import { LoadingPage } from "../loading-page/LoadingPage";
import { UserContext } from "../../Global/UserContext";
import { useHistory } from "react-router-dom";
import { AdminOrderContext } from "../../Global/AdminOrdersContext";
import { ProductsView } from "./ProductsView";
import { CatagoryView } from "./CatagoryView";
import { OrderView } from "./OrderView";
import { ContactsView } from "./ContactsView";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { spinner } = useContext(AdminOrderContext);
  const history = useHistory();
  const [viewDashboard, setViewDashboard] = useState(<HomeView />);


  useEffect(() => {
    if (!user || user.type !== 'admin') {
      history.push("/login");
    }
  }, [user]);

// controll the view thet present in main view page
  const SideBarLinks = (path) => {
    switch (path) {
      case "Dashboard":
        setViewDashboard(<HomeView />);
        break;
      case "Products":
        setViewDashboard(<ProductsView></ProductsView>);
        break;
      case "Add-Product":
        setViewDashboard(<AddProducts />);
        break;
      case "Catagories":
        setViewDashboard(<CatagoryView />);
        break;
      case "Add-Catagory":
        setViewDashboard(<AddCatagory />);
        break;
      case "Orders":
        setViewDashboard(<OrderView />);
        break;
      case "Contacts":
        setViewDashboard(<ContactsView />);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-fluid">
      <div class="row flex-nowrap">
        {/* //Sidebar */}
        <SideBar SideBarLinks={SideBarLinks} />
        <div class="col">
          <h1>
            {" "}
            <span class="badge bg-light text-danger">Dashboard-Admin</span>
          </h1>
          <div id="main" class="col px-5">
            {spinner && (
              <div class="container">
                <LoadingPage />
              </div>
            )}
            {!spinner && <div class="">{viewDashboard}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
