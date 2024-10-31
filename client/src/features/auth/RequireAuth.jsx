import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import React from "react";
import { toast } from "react-toastify";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  if (token ) return <Outlet />;
  else return <Navigate to="/Login" state={{ from: location }} replace />;
};

export default RequireAuth;
