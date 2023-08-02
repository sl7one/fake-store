import { create } from 'zustand';
import { getProductsAPI } from './ProductsOperations';

export const useProductsStore = create((set, get) => ({
   products: [],
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
   setIsChoosed: (id) => {
      const products = get().products;
      const updatedProducts = products.map((el) =>
         el.id === id ? { ...el, isChoosed: !el.isChoosed } : el
      );
      set({ products: updatedProducts });
   },
   setNewRating: (id, value) => {
      const products = get().products;
      const updatedProducts = products.map((el) =>
         el.id === id ? { ...el, rating: { ...el.rating, rate: value } } : el
      );
      set({ products: updatedProducts });
   },
}));
