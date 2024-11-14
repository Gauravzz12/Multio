import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import React from "react";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (token) {
    if (location.pathname === "/Login" || location.pathname === "/Register") {
      return <Navigate to="/Home" replace />;
    }
    return <Outlet />;
  } else {
    if (location.pathname !== "/Login" && location.pathname !== "/Register") {
      return <Navigate to="/Login" replace />;
    }
    return <Outlet />;
  }
};

export default RequireAuth;
