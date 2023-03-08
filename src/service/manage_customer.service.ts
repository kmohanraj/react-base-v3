import axios from './config';

export const create = async (data: any, userId: number) => {
  try {
    return await axios.post(`/${userId}/manage_customer/new`, data);
  } catch (err: any) {
    return err.response;
  }
};

export const update = async (data: any, userId: number) => {
  try {
    return await axios.put(`/${userId}/manage_customer/update`, data);
  } catch (err: any) {
    return err.response;
  }
};

export const remove = async (manageCustomerId: number, userId: number) => {
  try {
    return await axios({
      url: `/${userId}/manage_customer/delete`,
      method: 'DELETE',
      data: { id: manageCustomerId }
    });
  } catch (err: any) {
    return err.response;
  }
}

export const getAll = async (groupId: number, userId: number) => {
  try {
    return (await axios.get(`/${userId}/group/${groupId}/getAll`)).data;
  } catch (err: any) {
    return err.response;
  }
};
