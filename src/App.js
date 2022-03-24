import React, { useContext } from "react";
import { Navbar } from "./Components/common/Navbar";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { Home } from "./Components/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { Signup } from "./Components/auth/Signup";
import { Login } from "./Components/auth/Login";
import { NotFound } from "./Components/common/NotFound";
import { Cart } from "./Components/Cart";
import { CartContextProvider } from "./Global/CartContext";
import { AddProducts } from "./Components/admin/AddProducts";
import { ProductPage } from "./Components/ProductPage";
import { AddCatagory } from "./Components/admin/AddCatagory";
import { Products } from "./Components/Products";
import { ViewsProducts } from "./Components/ViewsProducts";
import { Footer } from "./Components/Footer";
import { UserProfile } from "./Components/UserProfile";
import { UserContextProvider } from "./Global/UserContext";
import { Contact } from "./Components/common/Contact";
import { Orders } from "./Components/Orders";
import { OrderPage } from "./Components/OrderPage";
import { OrderContextProvider } from "./Global/OrderContext";
import ScrollToTop from "./Utils/ScrollToTop";
import { Dashboard } from "./Components/admin/Dashboard";
import { AdminOrdersContextProvider } from "./Global/AdminOrdersContext";
import { AboutMe } from "./Components/AboutMe";
import { UserContext } from "./Global/UserContext.js";
export const App = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <React.Fragment>
      <ScrollToTop />
      <ProductsContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <AdminOrdersContextProvider>
              <div id="container">
                <Navbar />
                <div id="main-content">
                  <Switch>
                    {/* home */}
                    <Route exact path="/" component={Home} />
                    {/* signup */}
                    <Route path="/signup" component={Signup} />
                    {/* login */}
                    <Route path="/login" component={Login} />
                    {/* cart products} */}
                    {user && <Route path="/cart" component={Cart} />}
                    {/*  ProductPage  } */}
                    <Route path="/products/:id" component={ProductPage}></Route>
                    {/*  Order Page  } */}
                    <Route path="/OrderPage/:id" component={OrderPage}></Route>
                    {/*  Products } */}
                    <Route path="/products" component={Products}></Route>
                    {/*  Views Products } */}
                    <Route
                      path="/viewsproducts"
                      component={ViewsProducts}
                    ></Route>
                    {/*  About Me } */}
                    <Route path="/about" component={AboutMe}></Route>
                    {/*  User Profile} */}
                    {user && (
                      <Route
                        path="/userprofile"
                        component={UserProfile}
                      ></Route>
                    )}
                    {/* Contact */}
                    <Route path="/contact" component={Contact} />
                    {/* Contact */}
                    {user && <Route path="/orders" component={Orders} />}
                    {/* Dashboard */}
                    {user && user.type === "admin" && (
                      <Route path="/dashboard" component={Dashboard} />
                    )}
                    {/* not-found */}
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/" />
                    <Redirect to="/not-found" />
                  </Switch>
                </div>
              </div>

              <Footer />
            </AdminOrdersContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </React.Fragment>
  );
};

export default App;
