import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../services/cartServices";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { setAuthModal } from "../store/authModal";
import { toast } from "react-toastify";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth || null);
  const descriptionStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const handleAddToCart = async () => {
    try {
      if (!userData?.user) {
        dispatch(setAuthModal(true));
        return;
      }
      const body = {
        productId: item.id,
        quantity: 1,
      };
      const res = await addToCart({}, {}, body);
      dispatch(addItem(res.data.data));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, marginX: "auto" }} elevation={3}>
      <CardMedia
        component="img"
        alt="apple"
        height="140"
        image={item.imageUrl}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" sx={descriptionStyle}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
