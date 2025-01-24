import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log(location.pathname, isAuthenticated);

  if (!isAuthenticated) {
    if (location.pathname.includes("/login") || location.pathname.includes("/register")) {
      return <>{children}</>;
    }
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/user/home" />;
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("user")) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/user/home" />;
  }

   return <>{children}</>;
}

export default CheckAuth;
