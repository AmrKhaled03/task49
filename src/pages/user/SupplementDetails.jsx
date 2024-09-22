import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../components/MainContext";
import { SecondContext } from "./CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SupplementDetails = () => {
  const { id } = useParams();
  const { supplements } = useContext(MyContext);
  const { addToCart } = useContext(SecondContext);
  const [supplement, setSupplement] = useState(null);

  useEffect(() => {
    const foundSupplement = supplements.find(
      (supplement) => supplement.id === id
    );
    if (foundSupplement) {
      setSupplement(foundSupplement);
    } else {
      toast.error("Supplement not found!", { autoClose: 2000 });
    }
  }, [id, supplements]);

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

  if (!supplement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="supplement-details d-flex justify-content-center align-items-center flex-column text-center">
      <div className="container">
        <h1 className="text-center my-5">{supplement.title}</h1>
        <img
          src={supplement.img}
          alt={supplement.title}
          className="img-fluid my-5"
          id="main-img"
        />
        <p className="my-5">{supplement.target}</p>
        <span className="my-5">{supplement.price}$</span>

        <button
          type="button"
          onClick={() => handleAdd(supplement.id)}
          className="btn btn-success w-100 m-2"
        >
          Add To Cart
        </button>
        <Link to="/user/supplements" className="btn btn-secondary w-100 m-2">
          Back to Supplements
        </Link>
      </div>
    </div>
  );
};

export default SupplementDetails;
