import React ,{useContext}from 'react'
import '../styles/Footer.css'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../Global/UserContext';
export const Footer = () => {
    const { user } = useContext(UserContext);


    return (
      <div className=" footer w-100 bg-success">
        <footer className="text-center text-white ">
          <section className="">
            {!user && (
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <span>
                  <Link
                    to="signup"
                    className="navlink mr-4 btn btn-outline-success text-white"
                  >
                    SIGN UP
                  </Link>
                </span>
              </p>
            )}
            {user && (
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Hi! {user.name}</span>
              </p>
            )}
            <div className="text-center  name">
              © 2021 Copyright:
              <a className="text-white"> Maor Elimelech</a>
            </div>
          </section>
        </footer>
      </div>
    );
}

