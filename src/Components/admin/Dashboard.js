import React, { useContext, useEffect, useState } from "react";
import { NavBarDash } from "./NavBarDash";
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
    if (!user || user.type !== "admin") {
      history.push("/login");
    }
  }, [user]);

  // controll the view thet present in main view page
  const NavBarLinks = (path) => {
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
    <div>
      <div>
        <h2>
          {" "}
          <span className="badge bg-light text-danger">Dashboard-Admin</span>
        </h2>
        {/* //Sidebar */}
        <NavBarDash NavBarLinks={NavBarLinks} />
      </div>
      <h1 />
      <div className="">
        <div className="col">
          {spinner && (
            <div className="container">
              <LoadingPage />
            </div>
          )}
          {!spinner && (
            <div className="container justify-content-center ">
              {viewDashboard}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
