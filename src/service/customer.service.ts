import axios from "./config";

export const create = (data: any, userId: number) => {
  try {
    return axios.post(`/${userId}/customer/new`, data)
  } catch(err: any) {
    return err.response;
  }
}

export const update = (data: any, userId: number) => {
  try {
    return axios.put(`/${userId}/customer/update`, data)
  } catch(err: any) {
    return err.response
  }
}

export const getAll = async (userId: number) => {
  try {
    return (await axios.get(`/${userId}/customer/getAll`)).data
  } catch(err: any) {
    return err.response
  }
}