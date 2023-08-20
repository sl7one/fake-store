type ColorValue = "blueviolet" | "orange" | "cyan" | "greenyellow";

interface IColors {
   readonly [key: string]: ColorValue;
  }


export const colors: IColors = {
    electronics: 'blueviolet',
    jewelery: 'orange',
    "men's clothing": 'cyan',
    "women's clothing": 'greenyellow',
 };