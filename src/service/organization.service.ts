import axios from "./config";

class OrganizationService {
  async create(data: any, userId: number) {
    try {
      return await axios.post(`/${userId}/org/new`, data)
    } catch(err: any) {
      return err.response;
    }
  }

  async update(data: any, userId: number) {
    try {
      return await axios.put(`/${userId}/org/update`, data)
    } catch(err: any) {
      return err.response;
    }
  }
  
  async getAll(userId: number) {
    try {
      return (await axios.get(`/${userId}/organizations`)).data
    } catch(err: any) {
      return err.response;
    }
  }
}

export default new OrganizationService();
