import React, { useContext } from "react";
import { Authentication } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    inputReg,
    setInputReg,
    emailReg,
    setEmailReg,
    passReg,
    setPassReg,
    rule,
    setRule,
    handleRegister,
  } = useContext(Authentication);

  const register = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!inputReg || !emailReg || !passReg || !rule) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await handleRegister();
      navigate("/login");
    } catch (e) {
      console.error("Registration error:", e.message);
    }
  };

  return (
    <div className="form my-5 p-5">
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
            <h1>Register Here</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={register}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={inputReg}
                  onChange={(e) => setInputReg(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={emailReg}
                  onChange={(e) => setEmailReg(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={passReg}
                  onChange={(e) => setPassReg(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rule" className="form-label">
                  Rule
                </label>
                <select
                  id="rule"
                  className="form-select"
                  value={rule}
                  onChange={(e) => setRule(e.target.value)}
                >
                  <option>Select rule</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mb-2 w-100">
                Register
              </button>
              <button
                type="button"
                className="btn btn-warning text-white w-100"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
