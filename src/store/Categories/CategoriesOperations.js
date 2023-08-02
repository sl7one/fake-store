import axios from 'axios';

export const getCategoriesAPI = async () => {
   const { data } = await axios.get('https://fakestoreapi.com/products/categories');
   return data;
};
