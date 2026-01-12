import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistoryPage";
import { isTokenExpired } from "./utils/Auth";
import ProtectedRoute from "./routes/ProtectedRoute"; 

function App() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Routes>
     
      <Route path="/" element={<Navigate to="/register" replace />} />

    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

   
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cartpage"
        element={
          <ProtectedRoute>
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          </ProtectedRoute>
        }
      />
  
      

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      
    </Routes>
  );
}

export default App;
