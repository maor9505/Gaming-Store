import React, { useContext, useEffect, useState } from "react";
 import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader,SidebarFooter,SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
export const SideBar = ({ SideBarLinks }) => {
  return (
    <div className="col-1 bg-light">
      <div className="d-flex flex-column align-items-center align-items-sm-start  pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <a href="#" className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>{" "}
              <span
                onClick={() => SideBarLinks("Dashboard")}
                className="ms-1 d-none d-sm-inline"
              >
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span
                onClick={() => SideBarLinks("Products")}
                className="ms-1 d-none d-sm-inline"
              >
                Products
              </span>{" "}
            </a>
            <ul
              className="collapse show nav flex-column ms-1"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li>
                <a href="#" className="nav-link px-0">
                  {" "}
                  <span
                    onClick={() => SideBarLinks("Add-Product")}
                    className="d-none d-sm-inline"
                  >
                    Add-Product
                  </span>{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#submenu5"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span
                onClick={() => SideBarLinks("Catagories")}
                className="ms-1 d-none d-sm-inline"
              >
                Catagories
              </span>{" "}
            </a>
            <ul
              className="collapse show nav flex-column ms-1"
              id="submenu5"
              data-bs-parent="#menu"
            >
              <li>
                <a href="#" className="nav-link px-0">
                  {" "}
                  <span
                    onClick={() => SideBarLinks("Add-Catagory")}
                    className="d-none d-sm-inline"
                  >
                    Add-Catagory
                  </span>{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-table"></i>{" "}
              <span
                onClick={() => SideBarLinks("Orders")}
                className="ms-1 d-none d-sm-inline"
              >
                Orders
              </span>{" "}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-table"></i>{" "}
              <span
                onClick={() => SideBarLinks("Contacts")}
                className="ms-1 d-none d-sm-inline"
              >
                Contacts
              </span>{" "}
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};
