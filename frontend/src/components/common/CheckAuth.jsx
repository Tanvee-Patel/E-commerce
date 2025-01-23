import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Case when user is not authenticated
  if (!isAuthenticated) {
    // Allow navigation to login or register pages
    if (location.pathname.includes("/login") || location.pathname.includes("/register")) {
      return <>{children}</>;
    }
    // Redirect to login page if trying to access protected route
    return <Navigate to="/auth/login" />;
  }

  // If user is authenticated but trying to access login/register pages, redirect them based on role
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/user/home" />;
  }

  // Admin should not access user routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("user")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // User should not access admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/user/home" />;
  }

  // Allow access to the children components if none of the above conditions match
  return <>{children}</>;
}

export default CheckAuth;
