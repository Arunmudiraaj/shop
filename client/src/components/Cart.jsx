import {
  Box,
  Button,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { setCartData, updateQuantity } from "../store/cartSlice";
import { updateCartItemQuantity } from "../services/cartServices";
import { placeOrder } from "../services/orderService";
import { toast } from "react-toastify";

const Cart = ({ open, closeCart }) => {
  const cartItems = useSelector((state) => state.cart) || [];
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("card");
  const [enterDetails, setEnterDetails] = useState(false);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (!open) {
      setAddress("");
      setEnterDetails(false);
    }
  }, [open]);
  const updateItemQuantity = async (cartItem, quantity) => {
    try {
      const body = {
        quantity,
        productId: cartItem?.product?.id,
      };
      await updateCartItemQuantity({}, {}, body);
      dispatch(updateQuantity({ cartItemId: cartItem?.id, quantity }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!enterDetails) {
        setEnterDetails(true);
        return;
      } else {
        if (address && paymentMode) {
          const res = await placeOrder(
            {},
            {},
            { paymentMethod: paymentMode, shippingAddress: address }
          );
          dispatch(setCartData([]));
          closeCart();
          toast.success(res?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeCart}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#ddebf6" }}>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.product?.name}
                    </TableCell>
                    <TableCell align="center">{row?.product?.price}</TableCell>
                    <TableCell align="center">{row?.quantity}</TableCell>
                    <TableCell align="center">
                      {row?.product?.price * row?.quantity}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() =>
                          updateItemQuantity(row, row?.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          updateItemQuantity(row, row?.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Cart is Empty
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {enterDetails && cartItems.length > 0 && (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={2}
            gap={2}
          >
            <Select
              value={paymentMode}
              placeholder="Payment Mode"
              sx={{ width: 150 }}
              size="small"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value={"card"}>Card</MenuItem>
              <MenuItem value={"cod"}>COD</MenuItem>
              <MenuItem value={"upi"}>UPI</MenuItem>
            </Select>
            <TextField
              sx={{ width: 200 }}
              placeholder="Address"
              fullWidth
              size="small"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        )}
        {cartItems.length > 0 && (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={2}
          >
            <Typography variant="h6">Total Amount: ${total}</Typography>
            <Button variant="contained" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Cart;
