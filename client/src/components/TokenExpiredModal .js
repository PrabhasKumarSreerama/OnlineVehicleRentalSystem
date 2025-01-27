import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TokenExpiredModal = () => {
  const { isModalVisible, handleLoginClick } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location.pathname", location.pathname);
  const excludedPages = ["/", "/login", "/register", "/dashboard"];

  if (!isModalVisible) return null;
  
  if (excludedPages.includes(location.pathname)) {
    return null;
  }

  const handleClose = () => {
    navigate("/");
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };


  return (
    <div
      onClick={handleModalClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        opacity: isModalVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.5s ease-out",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            color: "#333",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Oops! Your session has expired
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Your session has ended. Please log in again to continue where you left
          off. We’ll be happy to have you back!
        </p>

        <button
          onClick={handleLoginClick}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            width: "100%",
            maxWidth: "200px",
            margin: "0 auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007bff";
          }}
        >
          Login Again
        </button>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
