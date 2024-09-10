import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Badge, Button } from "@mui/material";
import { checkAuth } from "../auth/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./Cart";
import { setAuthModal } from "../store/authModal";
import { setCartData } from "../store/cartSlice";
import { checkAdminAuth } from "../auth/RequireAdminAuth";

const Navbar = () => {
  const pages = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth || null);
  if (checkAdminAuth(userData?.accessToken)) {
    pages.push({
      name: "Admin Panel",
      link: "/admin",
    });
  }
  const cartItems = useSelector((state) => state.cart);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cart, setCart] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCartData([]));
  };

  const handleOpenCart = () => {
    if (!userData?.user) {
      dispatch(setAuthModal(true));
    } else {
      setCart(true);
    }
  };
  const handleOpenAuthModal = () => {
    dispatch(setAuthModal(true));
  };

  return (
    <AppBar color="primary" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.link}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "secondary" : "white", // Active link color
                      fontWeight: isActive ? "bold" : "normal", // Make active link bold
                    })}
                  >
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingBagIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <NavLink
                  to={page.link}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? theme.palette.secondary.main : "white", // Active link color
                    fontWeight: isActive ? "bold" : "normal", // Make active link bold
                  })}
                >
                  {page.name}
                </NavLink>
              </MenuItem>
            ))}
          </Box>
          <Box display={"flex"} alignContent={"center"} gap={3}>
            <IconButton aria-label="cart" onClick={handleOpenCart}>
              <Badge badgeContent={cartItems.length || 0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {checkAuth(userData?.accessToken) ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "grey" },
                    }}
                  >
                    {userData?.user?.name
                      ? userData?.user?.name.charAt(0).toUpperCase()
                      : "S"}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                onClick={handleOpenAuthModal}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
        <Cart open={cart} closeCart={() => setCart(false)} />
      </Container>
    </AppBar>
  );
};
export default Navbar;
