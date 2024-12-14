import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'; // Import a delete icon

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl font-semibold text-gray-500">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-600 font-semibold">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Users List</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              

              {/* User Details */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{user.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role || 'User'}</p>
              </div>

              {/* Delete Icon */}
              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none mr-4"
                aria-label="Delete user"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
