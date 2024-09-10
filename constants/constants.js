const constants = {
  // Roles
  ROLE_ID: {
    ADMIN: 1,
    USER: 2,
  },
  // Access levels for different roles
  AUTH_ACCESS: {
    ADMIN_ACCESS: [1],
    OPEN_ACCESS: [1, 2],
  },
  // Firebase bucket folders
  FIREBASE_BUCKET: {
    PRODUCT_IMAGES: "product-images",
  },
  // Order status
  ORDER_STATUS: {
    PENDING: "pending",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
  },
};

module.exports = constants;
