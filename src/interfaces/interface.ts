type CategoryType = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";

export type ProductType = {
   id: number;
   title: string;
   price: number;
   description: string;
   category: CategoryType;
   image: string;
   rating: {
      rate: number;
      count: number;
   };
   isInCart?: boolean;
   isChoosed?: boolean;
   count?: number,
};

export interface ICategories {
   getAllCategories: () => void;
   categories: string[];
   isLoading: boolean;
}

export interface IProducts {
   getAllProducts: () => void;
   addProduct: () => void;
   products: ProductType[];
   setIsChoosed: (id:number) => void;
   setNewRating: (id:number, value:number) => void;
   choosedProducts: ProductType[];
   setCountIncrement: () => void;
   setCountDecrement: () => void;
   onChangeCount: () => void;
   setItemToBuy: (id:number) => void;
   isLoading: boolean;
}
