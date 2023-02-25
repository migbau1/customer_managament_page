import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export default function PublicRoute() {
  const auth = useAuth();

  return !auth.isLogged() ? <Outlet /> : <Navigate to={"/"} />;
}
