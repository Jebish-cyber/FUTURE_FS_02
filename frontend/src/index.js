import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // ✅ ADD THIS

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>   {/* ✅ ADD THIS */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
