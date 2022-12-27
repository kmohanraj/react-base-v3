import axios from "./config";

const getRoles = async (userId: number): Promise<unknown> => {
  try {
    return (await axios.get(`${userId}/role/getAll`)).data;
  } catch(err: any) {
    return err.response;
  }
}

export default getRoles;
