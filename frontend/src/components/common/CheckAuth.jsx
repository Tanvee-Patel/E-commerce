import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  // console.log("CheckAuth Rendered:", { isAuthenticated, user, location: location.pathname });

  if (!isAuthenticated) {
    if (location.pathname.includes("/login") || location.pathname.includes("/register")) {
      return <>{children}</>;
    }
    // console.log("Redirecting to login, storing path:", location.pathname);
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && (location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register"))) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/user/home"} replace />;
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/user")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/user/home" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;