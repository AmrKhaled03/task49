import React, { useContext } from "react";
import "../../App.css";
import { MyContext } from "../../components/MainContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { supplements, deleteItem, handleSearch } = useContext(MyContext);
  const navigator = useNavigate();
  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure To Delete")) {
      await deleteItem(id);

      toast.success("Deleted Successfully!", { autoClose: 2000 });
    } else {
      toast.error("Deletion Canceled.", { autoClose: 2000 });
    }
  };
  return (
    <div className="my-5 p-5 dashboard">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Welcome To Admin Dashboard</h1>
          </div>
        </div>
        <div className="row my-5 ">
          <div className="col-12">
            <div className="mb-3">
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => handleSearch(e.target.value)}
                className="form-control"
                placeholder="Search by title..."
              />
            </div>
            <Link to="/admin/form" className="btn btn-primary w-100">
              Add Supplement
            </Link>
          </div>
        </div>
        <div className="row my-5">
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
                {supplements.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center">
                      No Supplements Found
                    </td>
                  </tr>
                ) : (
                  supplements.map((supplement, index) => (
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
                        <button
                          type="button"
                          className="btn btn-primary mx-2"
                          onClick={() =>
                            navigator(`/admin/update/${supplement.id}`)
                          }
                        >
                          Update
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

export default Dashboard;
