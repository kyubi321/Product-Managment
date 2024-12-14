import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const ProductList = () => {
  const [products, setProducts] = useState([]); // Products to display
  const [allProducts, setAllProducts] = useState([]); // Full product list (backup for resetting search)
  const [searchQuery, setSearchQuery] = useState(""); // User search input
  const [searchResults, setSearchResults] = useState([]); // Search results for dropdown
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Show delete confirmation modal
  const [productToDelete, setProductToDelete] = useState(null); // Product to delete
  const [loading, setLoading] = useState(false); // Loading state
  const [highlightedProduct, setHighlightedProduct] = useState(null); // Product for shadow effect
  const productRefs = useRef({}); // Reference object to store product refs
  const navigate = useNavigate(); // React Router navigation

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
        setAllProducts(response.data); // Backup the full product list
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      setLoading(true);
      try {
        // Fetch search results from the backend
        const response = await axios.get(`http://localhost:3001/api/products/search?query=${query}`);
        setSearchResults(response.data); // Update displayed products with search results
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]); // Clear search results if query is empty
      setLoading(false); // Reset loading state
    }
  };

  const handleSelectProducteach = (productId) => {
    navigate(`/product-details/${productId}`);
  };
  

  // Navigate to product details on selection
  const handleSelectProduct = (productId) => {
    if (productRefs.current[productId]) {
      // Scroll to the product row
      productRefs.current[productId].scrollIntoView({
        behavior: "smooth",
        block: "center", // Scroll to center of the product row
      });

      // Highlight the selected product with a shadow for 1 second
      setHighlightedProduct(productId);
      setTimeout(() => {
        setHighlightedProduct(null); // Remove shadow after 1 second
      }, 1000);
    }

   
  };

  // Show delete confirmation modal
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId); // Set the product to delete
    setShowDeleteModal(true); // Show the modal
  };

  // Confirm deletion and delete the product
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${productToDelete}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productToDelete));
      setAllProducts((prevProducts) => prevProducts.filter((product) => product._id !== productToDelete));
      setShowDeleteModal(false); // Close the modal after successful deletion
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Cancel the deletion
  const cancelDelete = () => {
    setShowDeleteModal(false); // Simply close the modal
  };

  // Navigate to edit product page
  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="relative mb-6">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a product..."
          className="w-full p-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown List for Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <ul className="absolute w-full bg-white border border-t-0 max-h-60 overflow-y-auto mt-1 rounded-lg shadow-lg z-10">
            {searchResults.map((product) => (
              <li
                key={product._id}
                onClick={() => handleSelectProduct(product._id)} // Scroll to the selected product
                className="p-4 cursor-pointer hover:bg-gray-200"
              >
                {product.name} - {product.category}
              </li>
            ))}
          </ul>
        )}
        {loading && <div className="absolute mt-2">Loading...</div>}
      </div>

      {/* Product Table */}
      <table className="table-auto w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 w-12"></th>
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                ref={(el) => (productRefs.current[product._id] = el)} // Assign ref to each product row
                className={`hover:shadow-lg hover:bg-gray-50 transition-shadow rounded-lg ${highlightedProduct === product._id ? "shadow-lg" : ""}`} // Add shadow if this is the highlighted product
              >
                <td className="p-4 text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-gray-800 font-medium">{product.name}</span>
                </td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 text-gray-600">{product.stock}</td>
                <td className="p-4 text-gray-600">${product.price.toFixed(2)}</td>
                <td className="p-4 flex gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
