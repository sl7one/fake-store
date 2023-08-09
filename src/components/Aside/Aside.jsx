export const Aside = ({ onClickModalAddProduct, onClickModalCart, countItems }) => {
   return (
      <aside className="aside">
         <button onClick={onClickModalAddProduct}>Add product</button>
         <div>
            <span className={countItems ? 'count-visible' : null}>{countItems}</span>
            <button onClick={onClickModalCart}>Cart</button>
         </div>
      </aside>
   );
};
