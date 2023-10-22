import axios from "axios";
import CONSTANTS from "constants/constants";

export default axios.create({
  baseURL: process.env.REACT_APP_ENV_SERVICE_URI,
  withCredentials: true,
  headers: {
    authorization: sessionStorage.getItem(
      CONSTANTS.SESSION_STORAGE.AUTH_TOKEN_KEY
    ) as string
  }
})