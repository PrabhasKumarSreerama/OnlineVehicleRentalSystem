import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./output.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicle from "./pages/Vehicle";
import Admin from "./pages/Admin";
import UserDashboard from "./components/UserDashboard";
import AddVehicle from "./pages/AddVehicle";

const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles/:id" element={<Vehicle />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/addvehicle" element={<AddVehicle />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
