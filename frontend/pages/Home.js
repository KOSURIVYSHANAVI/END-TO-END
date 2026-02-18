import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      padding: "100px",
      background: "linear-gradient(to right, #4facfe, #00f2fe)",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ fontSize: "40px" }}>
        Placement Readiness System
      </h1>

      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        Prepare • Practice • Get Placed
      </p>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "20px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
