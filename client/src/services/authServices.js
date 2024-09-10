import urlConstants from "../constants/urlConstants";
import axiosInstance, { buildUrl } from "../helpers/axios";

export const loginUser = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.post(
      buildUrl(urlConstants.LOGIN, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (params, queryParams, body) => {
  try {
    const response = await axiosInstance.post(
      buildUrl(urlConstants.REGISTER, params, queryParams),
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};
