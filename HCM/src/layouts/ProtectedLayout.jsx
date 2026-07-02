import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../auth/auth";

function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Auth.isAuthenticated().then((result) => {
      setAuthenticated(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedLayout;