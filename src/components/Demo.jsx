import React, { useContext } from "react";
import { MyContext } from "./MainContext";
import "../App.css";

const Demo = () => {
  const { supplements } = useContext(MyContext);

  return (
    <div className="row-demo w-100 my-5 p-5">
      {supplements.slice(0, 6).map((supplement, index) => (
        <div className=" demo" key={index}>
          <div className="body p-3">
            <img
              src={supplement.img}
              alt={supplement.title}
              loading="lazy"
              className="img-fluid mb-2"
            />
            <h2>{supplement.title}</h2>
            <span>{supplement.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Demo;
