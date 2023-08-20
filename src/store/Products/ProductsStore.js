import { create } from 'zustand';
import { addProductsAPI, getProductsAPI } from './ProductsOperations';

export const useProductsStore = create((set, get) => ({
   products: [],
   choosedProducts: [],
   isLoading: false,
   getAllProducts: async () => {
      set({ isLoading: true });
      try {
         const data = await getProductsAPI();
         set({ products: data });
      } catch (e) {
         console.log(e.message);
      } finally {
         set({ isLoading: false });
      }
   },
   addProduct: async (product) => {
      set({ isLoading: true });
      try {
         const products = get().products;
         const data = await addProductsAPI(product);
         products.push(data);
         set({
            products: [...products],
         });
      } catch (e) {
         console.log(e.message);
      } finally {
         set({ isLoading: false });
      }
   },
   setIsChoosed: (id) => {
      const products = get().products;
      const choosedProducts = get().choosedProducts;
      const updatedProducts = products.map((el) =>
         el.id === id ? { ...el, isChoosed: !el.isChoosed, isInCart: false } : el
      );
      const item = updatedProducts.find((el) => el.id === id);
      const idx = choosedProducts.findIndex((el) => el.id === id);

      item.isChoosed ? choosedProducts.push(item) : choosedProducts.splice(idx, 1);


      set({
         products: updatedProducts,
         choosedProducts: [...choosedProducts],
      });
   },
   setNewRating: (id, value) => {
      const products = get().products;
      const updatedProducts = products.map((el) =>
         el.id === id ? { ...el, rating: { ...el.rating, rate: value } } : el
      );
      set({ products: updatedProducts });
   },
   setCountIncrement: (id) => {
      const choosedList = get().choosedProducts;
      const updatedChoosedProducts = choosedList.map((el) => {
         const count = !el.count && el.count !== 0;
         return el.id === id ? { ...el, count: count ? 1 : el.count + 1 } : el;
      });

      set({
         choosedProducts: [...updatedChoosedProducts],
      });
   },
   setCountDecrement: (id) => {
      const choosedList = get().choosedProducts;
      const updatedChoosedProducts = choosedList.map((el) =>
         el.id === id ? { ...el, count: el.count ? el.count - 1 : 0 } : el
      );
      set({
         choosedProducts: [...updatedChoosedProducts],
      });
   },
   onChangeCount: (id, count) => {
      console.log(+count);
      const choosedList = get().choosedProducts;
      const updatedChoosedProducts = choosedList.map((el) =>
         el.id === id ? { ...el, count: +count } : el
      );

      set({
         choosedProducts: [...updatedChoosedProducts],
      });
   },
   setItemToBuy: (id) => {
      const choosedList = get().choosedProducts;
      const updatedChoosedProducts = choosedList.map((el) =>
         el.id === id ? { ...el, isInCart: true } : el
      );
      set({
         choosedProducts: [...updatedChoosedProducts],
      });
   },
}));
