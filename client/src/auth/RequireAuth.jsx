import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const checkAuth = (accessToken) => {
  try {
    if (!accessToken) return false;
    const { roleId } = jwtDecode(accessToken);
    if (!roleId) return false;
  } catch (e) {
    return false;
  }
  return true;
};

function RequireAuth() {
  const accessToken = useSelector((state) => state?.auth?.accessToken || null);

  return checkAuth(accessToken) ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAuth;
