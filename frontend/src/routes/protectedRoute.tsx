import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  if (!localStorage.getItem("token")) {
    console.error("No token found, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
