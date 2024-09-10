import urlConstants from "../constants/urlConstants";
import axiosInstance, { buildUrl } from "../helpers/axios";

export const placeOrder = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.post(
      buildUrl(urlConstants.PLACE_ORDER, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};
