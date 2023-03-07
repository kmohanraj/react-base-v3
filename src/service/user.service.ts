import axios from 'axios';
import Axios from './config';

let cancelToken: any;
class UserService {
  async login(data: any) {
    try {
      return await Axios.post('/user/login', data);
    } catch (err: any) {
      return err.response;
    }
  }
  
  async resetPasswordFirstLogin(data: any, userId: number) {
    try {
      return await Axios.post(`/user/${userId}/resetPasswordFirstLogin`, data);
    } catch (err: any) {
      return err.response;
    }
  }

  async register(data: any, userId: number) {
    try {
      return await Axios.post(`/user/${userId}/register`, data);
    } catch (err: any) {
      return err.response;
    }
  }

  async update(data: any, userId: number) {
    try {
      return await Axios.put(`/${userId}/user/update`, data);
    } catch (err: any) {
      return err.response;
    }
  }

  async remove(id: number, userId: number) {
    try {
      return await Axios({
        url: `/${userId}/user/delete`,
        method: 'DELETE',
        data: { id: id }
      });
    } catch (err: any) {
      return err.response;
    }
  }

  async status(selectedUserId: number, status: boolean, userId: number) {
    try {
      return await Axios({
        url: `/${userId}/user/status`,
        method: 'POST',
        data: {
          id: selectedUserId,
          status: status
        }
      });
    } catch (err: any) {
      return err.response;
    }
  }

  async getAll(userId: number) {
    this.cancelPreviousRequest()
    try {
      return (await Axios.get(`/user/${userId}/getAll`, {cancelToken: cancelToken.token})).data;
    } catch (err: any) {
      
      return err.response;
    }
  }
  async cancelPreviousRequest() {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('aborted')
    }
    cancelToken = axios.CancelToken.source()
  }
}



export default new UserService();
