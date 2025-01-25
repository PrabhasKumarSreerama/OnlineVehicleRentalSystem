import React, { useContext, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { AuthContext } from "../context/AuthContext";
import ConfirmationModal from "../components/ConfirmModal";

const Admin = () => {
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout(); 
    setShowModal(false); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/"
                  className="hover:underline hover:text-blue-200 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-blue-200 transition"
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="/admin/addvehicle"
                  className="hover:underline hover:text-blue-200 transition"
                >
                  Add New Vehicle
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="hover:underline hover:text-blue-200 transition"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}

      <main className="flex-grow container mx-auto py-8 px-4">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
          <p className="text-gray-600 mb-6">
            Here’s an overview of your admin tools and data.
          </p>
          <AdminDashboard />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
