import React, { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Authentication } from "../auth/AuthContext";

const Header = () => {
  const { isRegistered } = useContext(Authentication);
  return (
    <div className="header d-flex justify-content-center align-items-center flex-column">
      <h1
        className="text-center text-danger fs-100 welcome-text"
        id="welcome-text"
      >
        Welcome In Our Fitness Store
      </h1>
      <div className="row">
        <div className="col-12">
          <Link
            to={isRegistered ? "/login" : "/register"}
            className="btn  btn-primary w-100"
          >
            Explore Supplements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
