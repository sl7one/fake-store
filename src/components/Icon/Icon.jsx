import sprite from '../../assets/sprite.svg';

export const Icon = ({ name, fill, width = 32, height = 32 }) => {
   return (
      <svg
         width={width}
         height={height}
      >
         <use
            href={sprite + `#${name}`}
            fill={fill}
         ></use>
      </svg>
   );
};
