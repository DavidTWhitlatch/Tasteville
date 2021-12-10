import api from './apiConfig';

export const getAllFlavors = async () => {
  const resp = await api.get('/flavors');
  return resp.data;
};
