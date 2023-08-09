export const Cart = ({ list, categories }) => {


   const sorted = {}
   categories.forEach(category => {
      list.forEach((item)=>{
         if (category===item.category) sorted[category] = [...sorted[category], item]
      })
   });

   console.log(sorted);

   return (
      <div className="modal-cart">
         {!list.length ? (
            'Your cart is empty'
         ) : (
            <ul>
               {list.map(({ id, title, count, price }, idx) => (
                  <li key={id}>
                     <p>
                        {idx+1}. {title}
                     </p>
                     <p>
                        {count} * {price}$ = {count * price}
                     </p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};
