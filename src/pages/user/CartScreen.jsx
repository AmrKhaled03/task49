import React, { useContext } from "react";
import { SecondContext } from "./CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CartScreen = () => {
  const { cart, deleteCart } = useContext(SecondContext);
  const navigator = useNavigate();
  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure To Delete")) {
      await deleteCart(id);
      toast.success("Deleted Successfully!", { autoClose: 2000 });
      navigator("/user/supplements");
    } else {
      toast.error("Deletion Canceled.", { autoClose: 2000 });
    }
  };
  return (
    <div className="cart my-5 p-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Supplements Cart</h1>
          </div>
        </div>
        <div className="row my-5 ">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Id</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Target</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center">
                      No Supplements Added
                    </td>
                  </tr>
                ) : (
                  cart.map((supplement, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <img
                          src={supplement.img}
                          alt={supplement.title}
                          loading="lazy"
                          className="img-fluid "
                        />
                      </td>
                      <td>{supplement.title}</td>
                      <td>{supplement.price}</td>
                      <td>{supplement.target}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(supplement.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
