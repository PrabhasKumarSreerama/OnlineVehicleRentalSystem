import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, role: decoded.role });
    } else {
      localStorage.removeItem("token");
      setIsModalVisible(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id, role: decoded.role });
    setIsModalVisible(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setIsModalVisible(true);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isModalVisible, handleLoginClick }}>
      {children}
    </AuthContext.Provider>
  );
};
