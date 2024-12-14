import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    image: ''
  });
  const [successMessage, setSuccessMessage] = useState(null); // State to track success message visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:3001/api/products', product);
      
      // On success, display a success message card and reset the form
      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setProduct({ name: '', category: '', stock: '', price: '', image: '' }); // Reset the form

        // Auto-hide the success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success message card */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <p>{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="image" className="block">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
