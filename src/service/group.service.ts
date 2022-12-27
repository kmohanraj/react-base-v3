import axios from "./config";

export const create = async (data: any, userId: number) => {
  try {
    return await axios.post(`/${userId}/group/new`, data)
  } catch(err: any) {
    return err.response;
  }
}

export const update = async (data: any, userId: number) => {
  try {
    return await axios.put(`/${userId}group/update`, data)
  } catch(err: any) {
    return err.response;
  }
}

export const getAll = async (userId: number) => {
  try {
    return (await axios.get(`/${userId}/group/getAll`)).data
  } catch(err: any) {
    return err.response;
  }
}