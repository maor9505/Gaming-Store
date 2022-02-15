import React from "react";
import 'react-pro-sidebar/dist/css/styles.css';
export const NavBarDash = ({ NavBarLinks }) => {
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
            <a href="#" className="nav-link ">
              <i className="fs-4 bi-house"></i>{" "}
              <span
                onClick={() => NavBarLinks("Dashboard")}
                className="text-danger"
              >
                Dashboard
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link ">
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span onClick={() => NavBarLinks("Products")} className="ms-1">
                Products
              </span>{" "}
            </a>
            <ul className="collapse  ms-1" id="submenu1" data-bs-parent="#menu">
              <li>
                <a href="#" className="nav-link ">
                  {" "}
                  <span onClick={() => NavBarLinks("Add-Product")} className="">
                    Add-Product
                  </span>{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#submenu5" data-bs-toggle="collapse" className="nav-link ">
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span onClick={() => NavBarLinks("Catagories")} className="ms-1 ">
                Catagories
              </span>{" "}
            </a>
            <ul className="collapse  ms-1" id="submenu5" data-bs-parent="#menu">
              <li>
                <a href="#" className="nav-link px-0">
                  {" "}
                  <span
                    onClick={() => NavBarLinks("Add-Catagory")}
                    className=""
                  >
                    Add-Catagory
                  </span>{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="fs-4 bi-table"></i>{" "}
              <span onClick={() => NavBarLinks("Orders")} className="ms-1 ">
                Orders
              </span>{" "}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="fs-4 bi-table"></i>{" "}
              <span onClick={() => NavBarLinks("Users")} className="ms-1 ">
                Users
              </span>{" "}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="fs-4 "></i>{" "}
              <span onClick={() => NavBarLinks("Contacts")} className="ms-1 ">
                Contacts
              </span>{" "}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
