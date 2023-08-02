import { create } from 'zustand';
import { getCategoriesAPI } from './CategoriesOperations';

export const useCategoriesStore = create((set) => ({
   categories: [],
   isLoading: false,
   getAllCategories: async () => {
      set({ isLoading: true });
      try {
         const categories = await getCategoriesAPI();
         set({ categories });
      } catch (e) {
         console.log(e.message);
      } finally {
         set({ isLoading: false });
      }
   },
}));
