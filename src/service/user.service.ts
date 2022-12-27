import axios from "./config";

class UserService {
  async login(data: any) {
    try {
      return await axios.post('/user/login', data);
    } catch(err: any) {
      return err.response
    }
  }
  async create(data: any, userId: number) {
    try {
      return await axios.post(`/user/${userId}/register`, data)
    } catch(err: any) {
      return err.response;
    }
  }

  async getAll(userId: number) {
    try {
      return (await axios.get(`/user/${userId}/getAll`)).data
    } catch(err: any) {
      return err.response;
    }
  }
}

export default new UserService();
