import React, { useContext } from "react";
import { Link} from "react-router-dom";
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light  sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="ml-3 font-weight-bold">
            <b>GAMING</b>
            <span className="font-weight-light text-success">ZONE</span>
          </span>
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/viewsproducts">
                {" "}
                Views Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                {" "}
                About Us
              </Link>
            </li>
          </ul>

          <SearchBar placeholder="Enter a Product Name..." data={products} />
          {!user && (
            <div>
              <span>
                <Link
                  to="/signup"
                  className="navlink mr-4 btn btn-outline-success"
                >
                  SIGN UP
                </Link>
              </span>

              <span>
                <Link
                  to="/login"
                  className="navlink m-2 btn btn-outline-success"
                >
                  LOGIN
                </Link>
              </span>
            </div>
          )}
          {/* //// */}
          {user && (
            <div className="d-flex align-items-center ">
              <Link
                className="nav-link text-dark  position-relative"
                to="/cart"
              >
                <i className="fa fa-shopping-cart fa-3x "></i>
                <span className="position-absolute  top-0 start-80 translate-middle badge rounded-pill bg-danger">
                  {cartUser.length}
                </span>
              </Link>
              {user && ifAdmin && (
                <Link className="nav-link text-dark" to="/dashboard">
                  <button
                    type="button"
                    className="btn btn-outline-danger  border-danger"
                  >
                    Dashboard
                  </button>
                </Link>
              )}
              <div className="dropdown flex me-5">
                <button
                  className="btn btn-outline-success  text-dark  border-success dropdown-toggle  "
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul
                  className="dropdown-menu bg-light text-center border-success "
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li className="m-2 ">
                    <Link
                      to="/orders"
                      className="navlink  btn-outline-success btn-lg  "
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="m-2 ">
                    <Link
                      to="/userprofile"
                      className="navlink   btn-outline-success btn-lg "
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="m-2 ">
                    <Link
                      to="/contact"
                      className="navlink  btn-outline-success btn-lg "
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="m-2">
                    <Link
                      className="navlink  btn-outline-success btn-lg"
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
