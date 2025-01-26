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
import UpdateVehicle from "./pages/UpdateVehicle";
import UserList from "./components/UserList";
import TokenExpiredModal from "./components/TokenExpiredModal ";
import ReviewForm from "./components/ReviewForm";
import ReviewPage from "./pages/ReviewPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TokenExpiredModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles/:id" element={<Vehicle />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/addvehicle" element={<AddVehicle />} />
          <Route path="/admin/updatevehicle/:id" element={<UpdateVehicle />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/addreview/:id" element={<ReviewForm />} />
          <Route path="/vehicles/:vehicleId/reviews" element={<ReviewPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
