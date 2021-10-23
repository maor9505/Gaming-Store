import React from 'react'
import '../styles/Footer.css'
import { Link, NavLink } from 'react-router-dom';



export const Footer = () => {
    return (
    <div>
            <div class="footer">
                    <section class=""> 
                     <footer class="text-center text-white "> 
                        <div class="container p-4 pb-0">  
                            <section class="">
                        <p class="d-flex justify-content-center align-items-center">
                          <span class="me-3">Register for free</span>
                          <span><Link to="signup" class='navlink mr-4 btn btn-outline-success text-white'>SIGN UP</Link></span>
                        </p>
                      </section>
                          </div>
                    <div class="text-center p-3 name" >
                      © 2021 Copyright:
                      <a class="text-white" >    Maor Elimelech</a>
                    </div>
                  </footer>
                </section>
              
            </div>
    </div> 
    );
}

