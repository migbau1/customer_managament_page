import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export default function PrivateRoute() {
  const auth = useAuth();

  return auth.isLogged() ? <Outlet /> : <Navigate to={"/login"} />;
}
