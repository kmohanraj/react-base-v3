import axios from './config';

class BranchService {
  async create(data: any, userId: number) {
    try {
      return await axios.post(`${userId}/branch/new`, data);
    } catch (err: any) {
      return err.response;
    }
  }

  async update(data: any, userId: number) {
    try {
      return await axios.put(`${userId}/branch/update`, data);
    } catch (err: any) {
      return err.response;
    }
  }

  async getAll(userId: number) {
    try {
      return (await axios.get(`${userId}/branches`)).data;
    } catch (err: any) {
      return err.response;
    }
  }
}

export default new BranchService();
