import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box, Typography } from "@mui/material";

export const checkAdminAuth = (accessToken) => {
  try {
    if (!accessToken) return false;
    const { roleId } = jwtDecode(accessToken);
    if (roleId !== 1) return false;
  } catch (e) {
    return false;
  }
  return true;
};

function RequireAdminAuth() {
  const accessToken = useSelector((state) => state?.auth?.accessToken || null);

  return checkAdminAuth(accessToken) ? (
    <Outlet />
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "full", width: "100vw", marginTop: "100px" }}
    >
      <Typography variant="h5">
        You are not authorized to view this page!
      </Typography>
      <Link style={{ textDecoration: "none", color: "blue" }} to="/">
        Go Home
      </Link>
    </Box>
  );
}

export default RequireAdminAuth;
