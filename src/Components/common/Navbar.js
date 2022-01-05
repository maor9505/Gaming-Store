import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../Config/Config";
import { useHistory } from "react-router-dom";
import { SearchBar } from "../Search/SearchBar";
import { ProductsContext } from "../../Global/ProductsContext";
import { UserContext } from "../../Global/UserContext";
import { CartContext } from "../../Global/CartContext";

export const Navbar = () => {
  const { products } = useContext(ProductsContext);
  const { user, setUser } = useContext(UserContext);
    const { cartUser } = useContext(CartContext);

  const ifAdmin = user && user.type == "admin" ? true : false;
  const history = useHistory();

  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser();
      history.push("/");
    });
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light  sticky-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="ml-3 font-weight-bold">
            <b>GAMING</b>
            <span className="font-weight-light text-warning">ZONE</span>
          </span>
        </Link>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/products">
                Products
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link text-dark" to="/viewsproducts">
                {" "}
                Views Products
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                ??
              </a>
            </li>
          </ul>

          <SearchBar placeholder="Enter a Product Name..." data={products} />
          {!user && (
            <div>
              <span>
                <Link to="/signup" class="navlink mr-4 btn btn-outline-success">
                  SIGN UP
                </Link>
              </span>

              <span>
                <Link to="/login" class="navlink m-2 btn btn-outline-success">
                  LOGIN
                </Link>
              </span>
            </div>
          )}
          {/* //// */}
          {user && (
            <div class="d-flex align-items-center">
              <Link class="nav-link text-dark  position-relative" to="/cart">
                <i class="fa fa-shopping-cart fa-3x mr-2"></i>
                <span class="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartUser.length}
                </span>
              </Link>
              {user && ifAdmin && (
                <Link class="nav-link text-dark" to="/dashboard">
                  <button
                    type="button"
                    class="btn btn-outline-danger  border-danger"
                  >
                    Dashboard
                  </button>
                </Link>
              )}
              <div class="dropdown">
                <button
                  class="btn btn-outline-success text-dark  border-success dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li >
                    <Link
                      to="/orders"
                      class="navlink  btn-outline-success btn-lg"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userprofile"
                      class="navlink  btn-outline-success btn-lg"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      class="navlink  btn-outline-success btn-lg"
                    >
                      Contact
                    </Link>
                  </li>
                  <li >
                    <Link
                      class="navlink  btn-outline-success btn-lg"
                      onClick={handleLogout}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
