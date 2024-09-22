import React, { useContext, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import "../../App.css";
import { MyContext } from "../../components/MainContext";
import { SecondContext } from "./CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Supplements = () => {
  const { supplements } = useContext(MyContext);
  const { addToCart } = useContext(SecondContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadSupplements = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    loadSupplements();
  }, []);
  const handleAdd = async (id) => {
    if (id) {
      try {
        await addToCart(id);
        toast.success("Cart Added Successfully!", { autoClose: 2000 });
      } catch (error) {
        toast.error("Error in Adding to Cart!", { autoClose: 2000 });
      }
    } else {
      toast.error("Invalid ID!", { autoClose: 2000 });
    }
  };

  return (
    <div className="supplements d-flex justify-content-center align-items-center flex-column">
      <Banner />
      <div className="container">
        <div className="row my-5 p-5">
          <div className="col-12">
            <h1 className="text-center">All Supplements</h1>
          </div>
        </div>
        {loading === true ? (
          <>
            <h1 className="text-center">Loading ..... </h1>
          </>
        ) : (
          <div className="row">
            {supplements.map((supplement, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12   my-2" key={index}>
                <div className="body p-3">
                  <img
                    src={supplement.img}
                    alt={supplement.title}
                    className="img-fluid w-75 h-75"
                  />
                  <h6>{supplement.title}</h6>
                  <span>{supplement.price}$</span>
                  <button
                    type="button"
                    onClick={() => handleAdd(supplement.id)}
                    className="btn btn-success w-100 m-2"
                  >
                    Add To Cart
                  </button>
                  <Link
                    to={`/user/supplements/${supplement.id}`}
                    className="btn btn-warning w-100 m-2 text-light"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplements;
