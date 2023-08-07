import { useCallback, useEffect, useRef } from 'react';
import { Header } from '../Header/Header';
import { useCategoriesStore } from '../../store/Categories/CategoriesStore';
import { useProductsStore } from '../../store/Products/ProductsStore';
import { Products } from '../Products/Products';
import { DropZone } from '../DropZone/DropZone';
import { AddProduct } from '../Modals/AddProduct';
import { Cart } from '../Modals/Cart';

export const App = () => {
   const dropzone = useRef(null);
   const overlayRef = useRef(null);
   const { getAllCategories, categories, isLoading: isLoadingCategores } = useCategoriesStore((state) => ({
      getAllCategories: state.getAllCategories,
      categories: state.categories,
      isLoading: state.isLoading
   }));
   const {
      getAllProducts,
      addProduct,
      products,
      setIsChoosed,
      setNewRating,
      choosedProducts,
      setCountIncrement,
      setCountDecrement,
      onChangeCount,
   } = useProductsStore((state) => ({
      getAllProducts: state.getAllProducts,
      addProduct: state.addProduct,
      products: state.products,
      setIsChoosed: state.setIsChoosed,
      setNewRating: state.setNewRating,
      choosedProducts: state.choosedProducts,
      setCountIncrement: state.setCountIncrement,
      setCountDecrement: state.setCountDecrement,
      onChangeCount: state.onChangeCount,
   }));
   // const [transition, setTransition] = useState(false);

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

   const onClickModalAddProduct = () => {
      if (overlayRef.current.classList.contains('visible')) return;
      overlayRef.current.classList.add('visible');
   };
   const onClickModalCart = () => {
      if (overlayRef.current.classList.contains('visible')) return;
      overlayRef.current.classList.add('visible');
   };

   const onClickBackDrop = (e) => {
      const { target, currentTarget } = e;
      if (target === currentTarget) overlayRef.current.classList.remove('visible');
   };

   const onTransitionEnd = () => {
      console.log('object');
   };

   // const onAnimationStart = () => {
   //    console.log('object');
   // };

   //  console.log({ categories, products });

   return (
      <>
         <Header list={categories} />
         <main>
            <aside className="aside">
               <button onClick={onClickModalAddProduct}>Add product</button>
               <button onClick={onClickModalCart}>Cart</button>
            </aside>
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
                  setCountIncrement={setCountIncrement}
                  setCountDecrement={setCountDecrement}
                  onChangeCount={onChangeCount}
               />
            </section>
            <section>
               <div
                  className="overlay"
                  ref={overlayRef}
                  onClick={onClickBackDrop}
                  onTransitionEnd={onTransitionEnd}
               >
                  <AddProduct
                     onClickClose={onClickBackDrop}
                     categories={categories}
                     isLoading={isLoadingCategores}
                     addProduct={addProduct}
                  />
                  <Cart />
               </div>
            </section>
         </main>
         <footer></footer>
      </>
   );
};
