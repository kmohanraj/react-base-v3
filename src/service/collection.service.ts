import axios from './config';

export const create = async (data: any, userId: number) => {
  try {
    return await axios.post(`/${userId}/collection/new`, data);
  } catch (err: any) {
    return err.response;
  }
};

export const update = async (data: any, userId: number) => {
  try {
    return await axios.put(`/${userId}/collection/update`, data)
  } catch (err: any) {
    return err.response;
  }
}

export const remove = async (collectionId: number, userId: number) => {
  try {
    return await axios({
      url: `/${userId}/collection/delete`,
      method: 'DELETE',
      data: { id: collectionId }
    });
  } catch (err: any) {
    return err.response;
  }
};

export const getAll = async (userId: number, manageCustomerId: number) => {
  try {
    return (await axios.get(`/${userId}/collection/${manageCustomerId}/getAll`)).data
  } catch (err: any) {
    return err.response;
  }
}