interface IProps  {
   onClick: ()=>void,
   className?: string,
   children: React.ReactNode
}

export const Button = ({ onClick, className, children }: IProps) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className={className}
      >
         {children}
      </button>
   );
};
