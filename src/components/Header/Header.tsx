import { Navbar } from "../Navbar/Navbar";

export const Header = ({ list }: any) => {
   return (
      <header>
         <nav className="container">
            <Navbar list={list} />
         </nav>
      </header>
   );
};
