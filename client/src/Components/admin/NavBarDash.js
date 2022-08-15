import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {NavLink } from "react-router-dom";
export const NavBarDash = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <button
        className="navbar-toggler border-danger "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
        aria-controls="menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="container w-75">
        <ul
          className="nav collapse navbar-collapse justify-content-center bg-light"
          id="menu"
        >
          <li className="nav-item">
            <a className="nav-link ">
              <NavLink
                className="text-danger"
                to="/dashboard"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </NavLink>
            </a>
          </li>
          <li className="nav-item">
            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link ">
              Products{" "}
            </a>
            <ul className="collapse  ms-1" id="submenu1" data-bs-parent="#menu">
              <li>
                <a href="#" className="nav-link ">
                  <NavLink
                    to="/dashboard/products"
                    style={{ textDecoration: "none" }}
                  >
                    Products-Details
                  </NavLink>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link ">
                  <NavLink
                    to="/dashboard/add-product"
                    style={{ textDecoration: "none" }}
                  >
                    Add-Product
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#submenu2" data-bs-toggle="collapse" className="nav-link ">
              Categories
            </a>
            <ul className="collapse  ms-1" id="submenu2" data-bs-parent="#menu">
              <li>
                <a href="#" className="nav-link ">
                  <NavLink
                    to="/dashboard/catagory"
                    style={{ textDecoration: "none" }}
                  >
                    Catagories-Details
                  </NavLink>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link ">
                  <NavLink
                    to="/dashboard/add-catagory"
                    style={{ textDecoration: "none" }}
                  >
                    Add-Category
                  </NavLink>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="nav-link">
              <NavLink
                to="/dashboard/orders"
                style={{ textDecoration: "none" }}
              >
                Orders
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <NavLink
                to="/dashboard/users"
                style={{ textDecoration: "none" }}
              >
                Users
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <NavLink
                to="/dashboard/messages"
                style={{ textDecoration: "none" }}
              >
                Messages
              </NavLink>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
