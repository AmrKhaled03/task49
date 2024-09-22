import React, { useContext } from "react";

import "../../App.css";
import { MyContext } from "../../components/MainContext";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  const { supplements } = useContext(MyContext);
  return (
    <div className="home">
      <div className="header"></div>
      <div className="container">
        <div className="row p-5 my-5">
          <div className="col-12">
            <h1 className="text-center">Our Supplements</h1>
          </div>
        </div>
        <div className="row">
          {supplements.slice(0, 4).map((supplement, index) => {
            return (
              <div className="col-lg-4  col-md-6 col-sm-6" key={index}>
                <div className="body">
                  <img
                    src={supplement.img}
                    alt={supplement.title}
                    className="img-fluid w-75 h-75"
                  />
                  <h6>{supplement.title}</h6>
                  <span>{supplement.price}$</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row my-5 p-5 text-center">
          <div className="col-12">
            <Link to="/user/supplements" className="btn btn-primary btn-lg">
              Show All Supplements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
