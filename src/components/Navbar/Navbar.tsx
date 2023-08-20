import { colors } from "../../utils/colors";

export const Navbar = ({ list }: any) => {
   return (
      <ul className="nav__list">
         {list.map((el: any) => (
            <li
               key={el}
               className={colors[el]}
            >
               {el}
            </li>
         ))}
      </ul>
   );
};


