import api from './apiConfig';

export const getAllFoods = async () => {
  try{
    const resp = await api.get('/foods');
    return resp.data;
  } catch(e) {
    return {error: e.message}
  }
};

export const getOneFood = async (id) => {
  const resp = await api.get(`/foods/${id}`);
  return resp.data;
};

export const postFood = async (foodData) => {
  const resp = await api.post('/foods', { food: foodData });
  return resp.data;
};

export const putFood = async (id, foodData) => {
  const resp = await api.put(`/foods/${id}`, { food: foodData });
  return resp.data;
};

export const deleteFood = async (id) => {
  await api.delete(`/foods/${id}`);
};

export const addFlavor = async (idData) => {
  const resp = await api.post('/foods/flavors', { food: idData });
  return resp.data;
};
