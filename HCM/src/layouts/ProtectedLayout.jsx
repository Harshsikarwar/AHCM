import { Navigate, Outlet } from "react-router-dom";
import Auth from "../auth/auth";

function ProtectedLayout() {
  const authenticated = Auth.isAuthenticated();

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedLayout;