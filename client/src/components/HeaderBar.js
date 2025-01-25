import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { Link } from "react-router-dom";

function HeaderBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">BookMyRide</Link>
        </h1>
        <div className="space-x-4">
          {user?.id ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"} // Corrected syntax
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
