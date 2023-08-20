const sprite = require('../../assets/sprite.svg') as string;

interface IProps {
   name: string,
   fill: string,
   width: number,
   height: number
}

export const Icon = ({ name, fill, width = 32, height = 32 }: IProps) => {
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
