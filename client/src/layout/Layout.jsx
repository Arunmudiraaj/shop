import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import LoginSignupModal from "../components/LoginSignupModal";

const Layout = () => {
  return (
    <Container sx={{ padding: "0px !important" }} maxWidth="xl">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <LoginSignupModal />
    </Container>
  );
};

export default Layout;
