import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom';

import { auth } from '../../Config/Config'

import { useHistory } from 'react-router-dom'
// import { CartContext } from '../Global/CartContext'
import "../../styles/Navbar.css";
import { SearchBar } from '../Search/SearchBar';
import { ProductsContext } from '../../Global/ProductsContext'



export const Navbar = ({ user }) => {
    const { products } = useContext(ProductsContext);
    const ifAdmin = ( user && user.type == "admin") ? true : false;
    const history = useHistory();
    
    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/');
        })
    }

    return (

        // < !--Navbar -- >
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar sticky-top">
            {/* <!-- Container wrapper --> */}
            <div class="container-fluid">
                {/* <!-- Collapsible wrapper --> */}
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <!-- Navbar brand --> */}
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <span className="ml-3 font-weight-bold"><b>GAMING</b><span className="font-weight-light text-warning">ZONE</span></span>
                    </Link>
                    {/* <!-- Left links --> */}
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/products" >Products</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link text-dark" to="/viewsproducts" > Views Products</NavLink>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">??</a>
                        </li>
                    </ul>
                    <SearchBar placeholder="Enter a Product Name..." data={products} />

                </div>
                
                {/* //fix search design */}

                {!user && <div>
                    <span><Link to="signup" class='navlink mr-4 btn btn-outline-success'>SIGN UP</Link></span>
                    
                    <span><Link to="login" class='navlink m-2 btn btn-outline-success'>LOGIN</Link></span>
                </div>}

                <div class="me-3 ">
                    {
                        user && <div class="d-flex align-items-center">
                        <a class="text-reset " href="#">                       
                            <Link class="nav-link text-dark" to="/cart"><i class="fa fa-shopping-cart fa-3x mr-2"></i><div class="badge badge-primary ml-2"></div></Link>  
                        </a>
                        {
                            user && ifAdmin &&
                            <a class="text-reset " href="#">
                                    <Link class="nav-link text-dark" to="/"><button type="button" class="btn btn-outline-danger  border-danger">Dashboard</button></Link>
                            </a>
                        }
                            <div class="dropdown">
                                <button class="btn btn-outline-success text-dark  border-success dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                               {user.name}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                <li><a class="dropdown-item " href="#"> My Orders</a></li>
                                    <li><a class="dropdown-item " href="#"><Link to="userprofile" class='navlink btn btn-outline-success'>My Profile</Link></a></li>
                               <li><a class="dropdown-item " href="#">Contact</a></li>
                                <li><a class="dropdown-item" onClick={handleLogout} >Logout</a></li>
                            </ul>
                            </div>
                         </div>
                    }

            </div>
            </div>
        </nav>

    )
}
