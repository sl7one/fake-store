import axios from 'axios';

export const getProductsAPI = async () => {
   const { data } = await axios.get('https://fakestoreapi.com/products');
   return data;
};
