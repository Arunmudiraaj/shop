import urlConstants from "../constants/urlConstants";
import axiosInstance, { buildUrl } from "../helpers/axios";

export const getCart = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.get(
      buildUrl(urlConstants.GET_CART_ITEMS, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.post(
      buildUrl(urlConstants.ADD_TO_CART, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCartItemQuantity = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.put(
      buildUrl(urlConstants.UPDATE_CART, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};
