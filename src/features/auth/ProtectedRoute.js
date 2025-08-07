import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * A component to protect routes from unauthenticated users.
 * If the user exists in Redux state, renders the children.
 * Otherwise, redirects to the landing ("/") page.
 */
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // If user is authenticated, allow access
  if (user) return children;

  // If not authenticated, redirect to landing page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
