interface IProps {
   onClickModalAddProduct: () => void;
   onClickModalCart: () => void;
   countItems: number;
}

export const Aside = ({
   onClickModalAddProduct,
   onClickModalCart,
   countItems,
}: IProps) => {
   return (
      <aside className="aside">
         {/* <button onClick={onClickModalAddProduct}>Add product</button> */}
         <div>
            <span className={countItems ? 'count-visible' : ''}>{countItems}</span>
            <button onClick={onClickModalCart}>Cart</button>
         </div>
      </aside>
   );
};
