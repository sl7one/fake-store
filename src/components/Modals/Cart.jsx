import { useMemo } from 'react';
import { colors } from '../../utils/colors';

export const Cart = ({ list }) => {
   const products = useMemo(() => {
      const categoryObject = {};
      list.forEach((item) => {
         if (!categoryObject[item.category]) {
            categoryObject[item.category] = [];
         }
         categoryObject[item.category].push(item);
      });
      return Object.entries(categoryObject);
   }, [list]);
   let total = 0;

   return (
      <div className="modal-cart">
         {!products.length ? (
            <p className="empty">Your cart is empty</p>
         ) : (
            <>
               <ul className="modal-cart__category-list">
                  {products.map((el) => {
                     const [category, products] = el;

                     let totalByCategory = 0;

                     const productsList = products.map(
                        ({ id, title, count = 0, price }, idx) => {
                           totalByCategory += price * count;
                           total += totalByCategory;

                           return (
                              <li key={id}>
                                 <p>
                                    <span>{idx + 1}.</span> {title}
                                 </p>
                                 <p className="modal-cart__products-list-count">
                                    {count} items * {price}$ = {count * price}$
                                 </p>
                              </li>
                           );
                        }
                     );

                     return (
                        <li key={category}>
                           <p className={colors[category] + ' category-title'}>
                              {category}:
                           </p>
                           <ul className="modal-cart__products-list">{productsList}</ul>
                           <p className="total-category">
                              Total by category: {totalByCategory}
                           </p>
                        </li>
                     );
                  })}
               </ul>

               <div className="modal-cart__bottom">
                  <p className="total">Total: {total}$</p>
                  <button type="button">Buy</button>
               </div>
            </>
         )}
      </div>
   );
};
