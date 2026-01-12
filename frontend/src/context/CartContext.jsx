import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count on app start
  useEffect(() => {
    fetch("http://localhost:8085/displayProducts")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCartCount(data.length);
        }
      })
      .catch(() => setCartCount(0));
  }, []);

  const incrementCart = () => {
    setCartCount(prev => prev + 1);
  };

  const resetCart = () => {
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, incrementCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
