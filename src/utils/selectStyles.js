export const selectStyles = {
   container: (baseStyles) => ({ ...baseStyles }),
   control: (baseStyles, state) => {
      return {
         ...baseStyles,
         transition: 'border-color 350ms ease-in-out',
         borderColor: state.isFocused ? 'rgb(236, 236, 236)' : 'rgb(224, 224, 224)',
         borderRadius: 'unset',
         boxShadow: 'unset',

         ':hover': {
            borderColor: 'rgb(224, 224, 224)',
         },
      };
   },
   input: (base) => ({ ...base, fontWeight: 'inherit' }),
};
