import { colors } from '../../utils/colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// description
// :
// "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// rating
// :
// {rate: 3.9, count: 120}

import ReactStars from 'react-stars';

export const Products = ({ list, onClickProduct, onClickStars }) => {
   return (
      <ul>
         {list.map(
            ({ id, image, title, price, isChoosed, rating: { rate }, category }, idx) => (
               <li>
                  <div
                     className="content-block"
                     onClick={() => onClickProduct(id)}
                  >
                     <img
                        src={image}
                        alt={title}
                        className={isChoosed ? 'action-img' : null}
                     />
                     <h2 className={isChoosed ? 'title-action' : null}>{title}</h2>
                     <p className={isChoosed ? 'price-action' : null}>{price} $</p>
                  </div>
                  <span className={colors[category]}>{category}</span>
                  <ReactStars
                     className={isChoosed ? 'stars stars-action' : 'stars'}
                     count={5}
                     value={rate}
                     onChange={(value) => onClickStars(id, value)}
                     size={35}
                     color1="red"
                     color2={'#ffd700'}
                     half={false}
                  />
               </li>
            )
         )}
      </ul>
   );
};


