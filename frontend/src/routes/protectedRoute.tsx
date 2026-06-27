import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/authContext";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    console.error("No token found, redirecting to auth...");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
