import urlConstants from "../constants/urlConstants";
import axiosInstance, { buildUrl } from "../helpers/axios";

export const getAllProducts = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.get(
      buildUrl(urlConstants.GET_ALL_PRODUCT, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.delete(
      buildUrl(urlConstants.DELETE_PRODUCT, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};
