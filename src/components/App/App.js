import { useCallback, useEffect, useRef } from 'react';
import { Header } from '../Header/Header';
import { useCategoriesStore } from '../../store/Categories/CategoriesStore';
import { useProductsStore } from '../../store/Products/ProductsStore';
import { Products } from '../Products/Products';
import { DropZone } from '../DropZone/DropZone';

export const App = () => {
   const dropzone = useRef(null);
   const { getAllCategories, categories } = useCategoriesStore((state) => ({
      getAllCategories: state.getAllCategories,
      categories: state.categories,
   }));
   const { getAllProducts, products, setIsChoosed, setNewRating, choosedProducts } =
      useProductsStore((state) => ({
         getAllProducts: state.getAllProducts,
         products: state.products,
         setIsChoosed: state.setIsChoosed,
         setNewRating: state.setNewRating,
         choosedProducts: state.choosedProducts,
      }));

   useEffect(() => {
      getAllCategories();
      getAllProducts();
   }, [getAllCategories, getAllProducts]);

   const onClickProduct = useCallback(
      (id) => {
         setIsChoosed(id);
         choosedProducts.length === 0
            ? dropzone.current.classList.add('hidden')
            : dropzone.current.classList.remove('hidden');
      },
      [setIsChoosed, choosedProducts.length]
   );

   const onClickStars = (id, value) => {
      setNewRating(id, value);
   };

   const onClickClose = (id) => {
      onClickProduct(id);
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
            <section>
               <DropZone
                  ref={dropzone}
                  list={choosedProducts}
                  onClickClose={onClickClose}
               />
            </section>
         </main>
         <footer></footer>
      </>
   );
};
