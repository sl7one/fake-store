import axios from 'axios';

export const getProductsAPI = async () => {
   const { data } = await axios.get('https://fakestoreapi.com/products');
   return data;
};

export const addProductsAPI = async (product) => {
   const { data } = await axios.post('https://fakestoreapi.com/products', product);
   return data;
};
