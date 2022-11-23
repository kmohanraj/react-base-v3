import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_ENV_SERVICE_URI,
  // headers: {
  //   authorization: sessionStorage.getItem('auth_token_key') as string
  // }
})