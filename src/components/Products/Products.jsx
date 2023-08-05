// description
// :
// "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// rating
// :
// {rate: 3.9, count: 120}

import { ProductItem } from './ProductItem';

export const Products = ({ list, onClickProduct, onClickStars }) => {
  
   
   return (
      <ul className="products__list">
         {list.map(
            ({ id, image, title, price, isChoosed, rating: { rate }, category }) => (
               <ProductItem
                  id={id}
                  image={image}
                  title={title}
                  price={price}
                  isChoosed={isChoosed}
                  rate={rate}
                  category={category}
                  onClickProduct={onClickProduct}
                  onClickStars={onClickStars}
                  key={id}
               />
            )
         )}
      </ul>
   );
};
