import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-96 object-contain my-4"
      />
      <p className="text-gray-600">{product.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Specifications</h2>
        <ul className="list-disc list-inside">
          {Object.entries(product.technicalSpecifications).map(([key, value]) => (
            <li key={key} className="capitalize">
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Reviews</h2>
        <div>
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p>
                <strong>{review.user}:</strong> {review.comment}
              </p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
