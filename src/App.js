import React from 'react'
import { Navbar } from "./Components/common/Navbar";
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import {Switch, Route, Redirect } from 'react-router-dom'
import { Signup } from './Components/auth/Signup'
import { Login } from './Components/auth/Login';
import { NotFound } from './Components/NotFound';
import { Cart } from './Components/Cart';
import { CartContextProvider } from './Global/CartContext'
import { AddProducts } from './Components/admin/AddProducts';
import { ProductPage } from './Components/ProductPage';
import { AddCatagory } from "./Components/admin/AddCatagory";
import { Products } from './Components/Products';
import { ViewsProducts } from './Components/ViewsProducts';
import { Footer } from './Components/Footer';
import { UserProfile } from './Components/UserProfile';
import { UserContextProvider } from './Global/UserContext';

export const App = () => {

  return (
    <React.Fragment>
      <UserContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <Navbar  />
            <Switch>
              {/* home */}
              <Route exact path='/' component={Home} />
              {/* signup */}
              <Route path="/signup" component={Signup} />
              {/* login */}
              <Route path="/login" component={Login} />
              {/* cart products} */}
              <Route path="/cart" component={Cart} />
              {/*  ProductPage  } */}
              <Route path="/products/:id" component={ProductPage}></Route>
              {/*  Products } */}
              <Route path="/products" component={Products}></Route>
              {/*  Views Products } */}
              <Route path="/viewsproducts" component={ViewsProducts}></Route>
              {/*  User Profile} */}
              <Route path="/userprofile" component={UserProfile} ></Route>
              {/* add products */}
              <Route path="/addproducts" component={AddProducts} />
              {/* add products */}
              <Route path="/addcatagory" component={AddCatagory} />
              {/* not-found */}
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/" />
              <Redirect to="/not-found" />
            </Switch>
          <Footer />
        </CartContextProvider>
      </ProductsContextProvider>
        </UserContextProvider>
    </React.Fragment>
  )
}


export default App


