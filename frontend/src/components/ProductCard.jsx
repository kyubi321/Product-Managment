import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gray-100 transition">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </div>

      {/* Product Info on the Right */}
      <div className="flex items-center gap-6">
        <p className="text-gray-500">
          Stock: <span className="font-medium">{product.stock}</span>
        </p>
        <p className="text-gray-500">
          Price: <span className="font-medium">${product.price.toFixed(2)}</span>
        </p>
      </div>

      {/* Action Icons (Edit and Delete) */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
