import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utils/Auth";
import { useCart } from "../context/CartContext";

function NavBar({ search, setSearch }) {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/home")}>
        Mini-Shop
      </h2>

      <input
        className="search-box"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="nav-actions">
        <div className="nav-item cart" onClick={() => navigate("/cartpage")}>
          <FaShoppingCart size={20} />
          <span className="badge">{cartCount}</span>
        </div>

        {isLoggedIn ? (
          <>
            <div className="nav-item" onClick={() => navigate("/orders")}>
              <FaUser size={20} />
            </div>

            <div className="nav-item" onClick={handleLogout}>
              <FaSignOutAlt size={20} />
            </div>
          </>
        ) : (
          <div className="nav-item" onClick={() => navigate("/login")}>
            <FaUser size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
