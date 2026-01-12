import { useEffect, useState } from "react";
import "../styles/OrderHistory.css";
import { useNavigate } from "react-router-dom";


function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  const formatDateTime = (dateValue) => {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


  useEffect(() => {
    fetch("http://localhost:8085/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading your orders...</p>;
  }

  if (!orders.length) {
    return <p className="empty">No orders placed yet 🛍️</p>;
  }

  return (
  <div className="order-page">
    <h2 className="order-title">Order History</h2>

    <div className="order-wrapper">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <div className="order-date">
                Order Date: {formatDateTime(order.orderDate)}
              </div>
              <span className="order-status">PLACED</span>
            </div>

            <div className="order-total">
              ₹{order.totalAmount}
            </div>
          </div>

          <div className="product-list">
            {order.products?.map((p, index) => (
              <div key={index} className="product-item">
                <span className="product-name">{p.name}</span>
                <span className="product-qty">× {p.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="order-footer">
      <button className="home-btn" onClick={() => navigate("/home")}>
        Home
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div>
);


}

export default OrderHistory;
