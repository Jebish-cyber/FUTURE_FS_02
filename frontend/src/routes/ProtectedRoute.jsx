import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/Auth";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
