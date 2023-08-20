import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Header } from '../Header/Header';
import { useCategoriesStore } from '../../store/Categories/CategoriesStore';
import { useProductsStore } from '../../store/Products/ProductsStore';
import { Products } from '../Products/Products';
import { DropZone } from '../DropZone/DropZone';
import { Cart } from '../Modals/Cart';
import { Aside } from '../Aside/Aside';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { ICategories, IProducts } from '../../interfaces/interface';

export const App = () => {
   const dropzone = useRef<HTMLInputElement | any>(null);
   const overlayRef = useRef<HTMLInputElement>(null);
   const {
      getAllCategories,
      categories,
      isLoading: isLoadingCategores,
   }: ICategories = useCategoriesStore((state) => ({
      getAllCategories: state.getAllCategories,
      categories: state.categories,
      isLoading: state.isLoading,
   }));
   const {
      getAllProducts,
      products,
      setIsChoosed,
      setNewRating,
      choosedProducts,
      setCountIncrement,
      setCountDecrement,
      onChangeCount,
      setItemToBuy,
      isLoading: isLoadingProducts,
   }: IProducts = useProductsStore((state) => ({
      getAllProducts: state.getAllProducts,
      addProduct: state.addProduct,
      products: state.products,
      setIsChoosed: state.setIsChoosed,
      setNewRating: state.setNewRating,
      choosedProducts: state.choosedProducts,
      setCountIncrement: state.setCountIncrement,
      setCountDecrement: state.setCountDecrement,
      onChangeCount: state.onChangeCount,
      setItemToBuy: state.setItemToBuy,
      isLoading: state.isLoading,
   }));

   useEffect(() => {
      getAllCategories();
      getAllProducts();
   }, [getAllCategories, getAllProducts]);

   useEffect(() => {
      choosedProducts.length === 0
         ? dropzone.current?.classList.add('hidden')
         : dropzone.current?.classList.remove('hidden');

      if (dropzone.current?.children[0]?.swiper) {
         dropzone.current.children[0].swiper.slideTo(choosedProducts.length);
      }
      // dropzone.current?.children[0].swiper.slideTo(choosedProducts.length);
   }, [choosedProducts.length]);

   const onClickProduct = useCallback(
      (id: number) => {
         setIsChoosed(id);
      },
      [setIsChoosed]
   );

   const onClickStars = useCallback(
      (id: number, value: number) => setNewRating(id, value),
      [setNewRating]
   );

   const onClickDelete = useCallback(
      (id: number) => onClickProduct(id),
      [onClickProduct]
   );

   const onClickModalAddProduct = useCallback(() => {
      if (overlayRef.current?.classList.contains('visible')) return;
      overlayRef.current?.classList.add('visible');
   }, []);

   const onClickModalCart = useCallback(() => {
      if (overlayRef.current?.classList.contains('visible')) return;
      overlayRef.current?.classList.add('visible');
   }, []);

   const onClickBackDrop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const { target, currentTarget } = e;
      if (target === currentTarget) overlayRef.current?.classList.remove('visible');
   }, []);

   const onClickBuy = useCallback(
      (id: number) => {
         setItemToBuy(id);
      },
      [setItemToBuy]
   );

   const choosedProductsInCart = useMemo(
      () => choosedProducts.filter(({ isInCart }) => isInCart),
      [choosedProducts]
   );

   isLoadingCategores || isLoadingProducts ? Loading.pulse() : Loading.remove();

   return (
      <>
         <Header list={categories} />
         <main>
            <Aside
               onClickModalAddProduct={onClickModalAddProduct}
               onClickModalCart={onClickModalCart}
               countItems={choosedProductsInCart.length}
            />
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
                  onClickDelete={onClickDelete}
                  setCountIncrement={setCountIncrement}
                  setCountDecrement={setCountDecrement}
                  onChangeCount={onChangeCount}
                  onClickBuy={onClickBuy}
               />
            </section>
            <section>
               <div
                  className="overlay"
                  ref={overlayRef}
                  onClick={onClickBackDrop}
               >
                  {/* <AddProduct
                     onClickClose={onClickBackDrop}
                     categories={categories}
                     isLoading={isLoadingCategores}
                     addProduct={addProduct}
                  /> */}
                  <Cart list={choosedProductsInCart} />
               </div>
            </section>
         </main>
         <footer></footer>
      </>
   );
};
