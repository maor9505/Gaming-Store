import React, { useContext, useEffect, useState } from "react";
 import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader,SidebarFooter,SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
export const SideBar = ({ SideBarLinks }) => {
  return (
    <div class="col-1 bg-light">
      <div class="d-flex flex-column align-items-center align-items-sm-start  pt-2 text-white min-vh-100">
        <a
          href="/"
          class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li class="nav-item">
            <a href="#" class="nav-link align-middle px-0">
              <i class="fs-4 bi-house"></i>{" "}
              <span
                onClick={() => SideBarLinks("Dashboard")}
                class="ms-1 d-none d-sm-inline"
              >
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              class="nav-link px-0 align-middle"
            >
              <i class="fs-4 bi-speedometer2"></i>{" "}
              <span
                onClick={() => SideBarLinks("Products")}
                class="ms-1 d-none d-sm-inline"
              >
                Products
              </span>{" "}
            </a>
            <ul
              class="collapse show nav flex-column ms-1"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li>
                <a href="#" class="nav-link px-0">
                  {" "}
                  <span
                    onClick={() => SideBarLinks("Add-Product")}
                    class="d-none d-sm-inline"
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
              class="nav-link px-0 align-middle"
            >
              <i class="fs-4 bi-speedometer2"></i>{" "}
              <span
                onClick={() => SideBarLinks("Catagories")}
                class="ms-1 d-none d-sm-inline"
              >
                Catagories
              </span>{" "}
            </a>
            <ul
              class="collapse show nav flex-column ms-1"
              id="submenu5"
              data-bs-parent="#menu"
            >
              <li>
                <a href="#" class="nav-link px-0">
                  {" "}
                  <span
                    onClick={() => SideBarLinks("Add-Catagory")}
                    class="d-none d-sm-inline"
                  >
                    Add-Catagory
                  </span>{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="nav-link px-0 align-middle">
              <i class="fs-4 bi-table"></i>{" "}
              <span
                onClick={() => SideBarLinks("Orders")}
                class="ms-1 d-none d-sm-inline"
              >
                Orders
              </span>{" "}
            </a>
          </li>
          <li>
            <a href="#" class="nav-link px-0 align-middle">
              <i class="fs-4 bi-table"></i>{" "}
              <span
                onClick={() => SideBarLinks("Contacts")}
                class="ms-1 d-none d-sm-inline"
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
