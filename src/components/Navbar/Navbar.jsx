import { colors } from "../../utils/colors";

export const Navbar = ({ list }) => {
  
   return (
      <ul className="nav__list">
         {list.map((el) => (
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
