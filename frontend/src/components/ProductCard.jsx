import React, { useState, memo } from "react";
import "../styles/Home.css";
import { useCart } from "../context/CartContext";

const ProductCard = memo(({ product }) => {
  const SERVER_URL = "http://localhost:8085";
  const [loading, setLoading] = useState(false);
  const { incrementCart } = useCart(); 

  const addToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      incrementCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={addToCart} disabled={loading}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
});

export default ProductCard;
