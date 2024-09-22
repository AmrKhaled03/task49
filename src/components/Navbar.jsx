import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../auth/AuthContext";
import { SecondContext } from "../pages/user/CartContext";

const Navbar = () => {
  const { isLoggedIn, rule, handleLogout, isRegistered } =
    useContext(Authentication);
  const { cart } = useContext(SecondContext);
  const navigator = useNavigate();

  const handleLog = () => {
    handleLogout();
    navigator("/");
  };

  return (
    <>
      {(isRegistered || isLoggedIn) && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to={isLoggedIn && rule === "admin" ? "/admin" : "/user"}
            >
              <h1>Fitness</h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink
                  className="nav-link"
                  to={isLoggedIn && rule === "admin" ? "/admin" : "/user"}
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav-link"
                  to={isLoggedIn && rule === "admin" ? "#" : "/user/cart"}
                >
                  {rule === "user" ? `Cart (${cart.length})` : null}
                </NavLink>

                <NavLink
                  className="nav-link"
                  to={
                    isLoggedIn && rule === "admin" ? "#" : "/user/supplements"
                  }
                >
                  {" "}
                  {rule === "user" ? "Supplements" : null}
                </NavLink>

                {isLoggedIn && (
                  <button className=" btn  btn-danger" onClick={handleLog}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
