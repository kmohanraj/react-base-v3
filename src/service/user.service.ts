import axios from "./config";

class UserService {
  async login(data: any) {
    try {
      return await axios.post('/user/login', data);
    } catch(err: any) {
      return err.response
    }
  }
}

export default new UserService();
