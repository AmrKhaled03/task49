import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { MyContext } from "../../components/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const UpdateForm = () => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    target,
    setTarget,
    handleImageChange,
    updateSupplement,
    setImg,
    fetchData,
    img,
  } = useContext(MyContext);
  const { id } = useParams();
  const navigator = useNavigate();
  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/supplements/${id}`
      );
      if (response.status === 200) {
        setTitle(response.data.title);
        setPrice(response.data.price);
        setTarget(response.data.target); // Set the target field
        setImg(response.data.img); // Se
      } else {
        console.error("Item not found");
      }
    } catch (e) {
      console.error(`Fetch item error: ${e.message}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItem();
    } else {
      setTitle("");
      setPrice("");
      setTarget("");
      setImg("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const updatedData = {
      title,
      price,
      target,
      img,
    };

    try {
      await updateSupplement(id, updatedData);
      await fetchData();

      toast.success("Item updated successfully!", { autoClose: 2000 });

      navigator("/admin");
    } catch (error) {
      console.error("Update error:", error);

      toast.error("Failed to update item.", { autoClose: 2000 });
    }
  };

  return (
    <div className="form my-5 p-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Update Supplement</h1>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Bind handleSubmit to form submission */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
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
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Update Supplement
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
