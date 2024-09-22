import React, { useContext } from "react";
import "../../App.css";
import { MyContext } from "../../components/MainContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const FormScreen = () => {
  const {
    addItem,
    title,
    setTitle,
    price,
    setPrice,
    target,
    setTarget,
    handleImageChange,
  } = useContext(MyContext);
  const navigator = useNavigate();
  const handleAdd = async () => {
    await addItem();

    toast.success("Supplement Added Successfully!", { autoClose: 2000 });

    navigator("/admin");
  };
  return (
    <div className="form my-5 p-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Add Supplement</h1>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <form>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  aria-describedby="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Target</label>
                <input
                  type="text"
                  className="form-control"
                  id="target"
                  aria-describedby="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  aria-describedby="img"
                  onChange={handleImageChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={handleAdd}
              >
                Add Supplement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormScreen;
