import React ,{useContext}from 'react'
import '../styles/Footer.css'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../Global/UserContext';
export const Footer = () => {
    const { user } = useContext(UserContext);


    return (
      <div class="footer">
          <footer class="text-center text-white ">
            <div class="container  mt-2">
              <section class="">
                {!user && (
                  <p class="d-flex justify-content-center align-items-center">
                    <span class="me-3">Register for free</span>
                    <span>
                      <Link
                        to="signup"
                        class="navlink mr-4 btn btn-outline-success text-white"
                      >
                        SIGN UP
                      </Link>
                    </span>
                  </p>
                )}
                {user && (
                  <p class="d-flex justify-content-center align-items-center">
                    <span class="me-3">Hi! {user.name}</span>
                  </p>
                )}
                <div class="text-center p-3 name">
                  © 2021 Copyright:
                  <a class="text-white"> Maor Elimelech</a>
                </div>
              </section>
            </div>
          </footer>
      </div>
    );
}

