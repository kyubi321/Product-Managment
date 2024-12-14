import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import AddProductForm from './AddProduct';
import usePreventBackNavigation from "./nav";

const Home = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is admin
  const navigate = useNavigate();
  usePreventBackNavigation();

  useEffect(() => {
    // Check the user's role from localStorage when the component mounts
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true); // Set isAdmin to true if the user is an admin
    }
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]); // Update product list
    setShowAddForm(false); // Close the form
  };

  const handleLogout = () => {
    // Perform logout logic (e.g., clear session, tokens)
    localStorage.removeItem('userToken'); // Example for token removal

    // Replace the current history state to prevent back navigation
    window.history.replaceState(null, "", window.location.href);

    // Redirect to login page
    navigate('/login', { replace: true });
  };

  return (
    <div className="bg-slate-200 min-h-screen font-sans">
      {/* Header Section */}
      <header className="bg-orange-700 h-[80px] text-slate-100 py-4">
        <div className="mx-auto flex justify-between items-center">
          {/* Left Side: Store Name */}
          <h1 className="text-3xl font-bold ml-5 text-black">STOCKS</h1>

          {/* Buttons Section */}
          <div className="flex space-x-4">
            {/* Conditionally render the View Users button for admin */}
            {isAdmin && (
              <button
                onClick={() => navigate('/view-users')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                View Users
              </button>
            )}

            {/* Profile Section */}
            <div className="relative flex items-center">
              {/* Profile Picture */}
              <div
                className="w-10 h-10 rounded-full bg-gray-300 flex mr-5 items-center justify-center cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown visibility
              >
                <span className="text-white text-sm">P</span>
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-9 mt-2 w-30 bg-white shadow-md rounded-md text-black z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-600 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto p-4">
        {/* "Add Product" button */}
        <div className="text-right mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            {showAddForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {/* Add Product Form or Product List */}
        {showAddForm ? (
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <AddProductForm onProductAdded={handleProductAdded} />
          </div>
        ) : (
          <div className="space-x-6">
            <ProductList products={products} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
