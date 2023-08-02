import { useCallback, useEffect } from 'react';
import { Header } from '../Header/Header';
import { useCategoriesStore } from '../../store/Categories/CategoriesStore';
import { useProductsStore } from '../../store/Products/ProductsStore';
import { Products } from '../Products/Products';
import { DragDropContext } from 'react-beautiful-dnd';

export const App = () => {
   const { getAllCategories, categories } = useCategoriesStore((state) => ({
      getAllCategories: state.getAllCategories,
      categories: state.categories,
   }));
   const { getAllProducts, products, setIsChoosed, setNewRating } = useProductsStore(
      (state) => ({
         getAllProducts: state.getAllProducts,
         products: state.products,
         setIsChoosed: state.setIsChoosed,
         setNewRating: state.setNewRating,
      })
   );

   useEffect(() => {
      getAllCategories();
      getAllProducts();
   }, [getAllCategories, getAllProducts]);

   const onClickProduct = useCallback(
      (id) => {
         setIsChoosed(id);
      },
      [setIsChoosed]
   );

   const onClickStars = (id, value) => {
      setNewRating(id, value);
   };

   //  console.log({ categories, products });

   return (
      <>
         <Header list={categories} />
         <main>
            <section className="container">
               <Products
                  list={products}
                  onClickProduct={onClickProduct}
                  onClickStars={onClickStars}
               />
            </section>
         </main>
         <footer></footer>
      </>
   );
};
