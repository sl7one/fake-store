import ReactStars from "react-stars";
import { colors } from "../../utils/colors";

export const ProductItem = ({
   id,
   onClickProduct,
   onClickStars,
   image,
   title,
   isChoosed,
   price,
   rate,
   category
}) => {
   return (
      <li
         id={id}
      >
         <div
            className="content-block"
            onClick={() => onClickProduct(id)}
         >
            <img
               src={image}
               alt={title}
               className={isChoosed ? 'action-img' : null}
               draggable="false"
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
   );
};
