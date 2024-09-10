import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { loginUser, registerUser } from "../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { setAuthModal } from "../store/authModal";
import { getCart } from "../services/cartServices";
import { setCartData } from "../store/cartSlice";
import { toast } from "react-toastify";

function LoginSignupModal() {
  const authModal = useSelector((state) => state.authModal);

  const userData = useSelector((state) => state?.auth || null);
  const dispatch = useDispatch();
  const initialForm = {
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    adminUser: false,
  };
  const [type, setType] = useState("login");
  const [form, setForm] = useState(initialForm);
  const theme = useTheme();
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setForm(initialForm);
  }, [type, authModal]);

  const toggleType = () => setType(type === "login" ? "signup" : "login");
  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => dispatch(setAuthModal(false));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let body = {
        email: form.email,
        password: form.password,
      };
      if (type === "signup") {
        if (form.password !== form.confirmpassword) {
          toast.error("Confirm password do not match");
          return;
        }
        body.name = form.username;
        body.roleId = form.adminUser ? 1 : 2;
        const response = await registerUser({}, {}, body);
        console.log(response.data);
        setType("login");
        toast.success(response?.data?.message);
      } else {
        const response = await loginUser({}, {}, body);
        console.log(response.data.data);
        dispatch(loginSuccess(response.data.data));
        toast.success(response?.data?.message);
        getCartData();
        handleClose();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  const getCartData = async () => {
    try {
      const cart = await getCart();
      console.log(cart.data.data);
      dispatch(setCartData(cart?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={authModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {type === "login" ? "Log In" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {type === "signup" && <>
              <TextField
                sx={{ marginTop: 2 }}
                required
                fullWidth
                name="username"
                label="Username"
                size="small"
                value={form.username}
                onChange={handleFormChange}
              />
            </>}
            <TextField
              sx={{ marginTop: 2 }}
              required
              fullWidth
              id="email"
              label="Email Address"
              size="small"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={handleFormChange}
            />
            <TextField
              sx={{ marginTop: 2 }}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              value={form.password}
              onChange={handleFormChange}
            />
            {type === "signup" && <>
              <TextField
                sx={{ marginTop: 2 }}
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                size="small"
                value={form.confirmpassword}
                onChange={handleFormChange}
              />
              <FormControlLabel
                sx={{ marginTop: 2 }}
                control={
                  <Checkbox
                    value="adminUser"
                    name="adminUser"
                    color="primary"
                    onChange={(event) => setForm({ ...form, adminUser: event.target.checked })}
                  />
                }
                label="I am an Admin"
              />

            </>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {type === "login" ? "Log In" : "Sign Up"}
            </Button>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                color={theme.palette.primary.main}
                component="span"
                sx={{ cursor: "pointer" }}
                onClick={toggleType}
              >
                {" "}
                {type === "login"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Log In"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginSignupModal;
