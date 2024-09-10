const urlConstants = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  // product apis
  GET_ALL_PRODUCT: "/api/product/all",
  CREATE_PRODUCT: "/api/product/create",
  DELETE_PRODUCT: "/api/product/delete/:id",

  // cart apis
  GET_CART_ITEMS: "/api/cart/get",
  ADD_TO_CART: "/api/cart/add",
  UPDATE_CART: "/api/cart/update",

  // order apis
  PLACE_ORDER: "/api/order/create",
};

export default urlConstants;
