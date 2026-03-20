import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, token } = useAuth();

  // Not logged in at all
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their correct page
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "counselor") return <Navigate to="/counselor" />;
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
