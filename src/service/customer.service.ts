import axios from './config';

export const create = async (data: any, userId: number) => {
  try {
    return await axios.post(`/${userId}/customer/new`, data);
  } catch (err: any) {
    return err.response;
  }
};

export const update = async (data: any, userId: number) => {
  try {
    return await axios.put(`/${userId}/customer/update`, data);
  } catch (err: any) {
    return err.response;
  }
};

export const remove = async (customerId: number, userId: number) => {
  try {
    return await axios({
      url: `/${userId}/customer/delete`,
      method: 'DELETE',
      data: { id: customerId }
    });
  } catch (err: any) {
    return err.response;
  }
};

export const getAll = async (userId: number) => {
  try {
    return (await axios.get(`/${userId}/customer/getAll`)).data;
  } catch (err: any) {
    return err.response;
  }
};
