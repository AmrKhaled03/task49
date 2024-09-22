import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We couldn't find the page you're looking for.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
