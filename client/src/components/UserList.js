import React, { useContext, useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserList = () => {
  const { user, handleModalOpen } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch Users
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(token);
      const filteredUsers = response.data.filter((u) => u.role !== "admin");
      setUsers(filteredUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, token);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err.message);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(u._id)}
              >
                <td className="py-2 px-4 text-center">{u.name}</td>
                <td className="py-2 px-4 text-center">{u.email}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(u._id);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
