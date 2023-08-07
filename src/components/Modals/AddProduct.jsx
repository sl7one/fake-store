import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import { selectStyles } from '../../utils/selectStyles';

export const AddProduct = ({
   onClickClose,
   categories,
   isLoadingCategores,
   addProduct,
}) => {
   const [data, setData] = useState({
      title: '',
      price: 0,
      description: '',
      category: '',
   });
   const [files, setFiles] = useState([]);

   const { getRootProps, getInputProps } = useDropzone({
      accept: { 'image/jpeg': [], 'image/png': [] },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
         setFiles(
            acceptedFiles.map((file) =>
               Object.assign(file, {
                  preview: URL.createObjectURL(file),
               })
            )
         );
      },
   });

   const onSubmit = (e) => {
      e.preventDefault();
      const image = `https://i.citrus.world/imgcache/size_800/uploads/shop/7/9/79679c77230113a71420463f57f99872.jpg`;
      data.image = image;
      addProduct(data);
   };

   useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
   }, [files]);

   return (
      <div className="modal-add-product">
         <form
            className="form"
            onSubmit={onSubmit}
         >
            <div className="form__left">
               <div>
                  <Select
                     className="form__select"
                     isClearable={true}
                     isSearchable={true}
                     isLoading={isLoadingCategores}
                     name="category"
                     options={categories.map((el) => ({ value: el, label: el }))}
                     placeholder="Select category"
                     onChange={(option) =>
                        setData((prev) => ({ ...prev, category: option?.value || null }))
                     }
                     styles={selectStyles}
                  />
               </div>
               <div>
                  <label htmlFor="title"></label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     placeholder="Add title"
                     value={data.title}
                     onChange={({ target: { name, value } }) =>
                        setData((prev) => ({ ...prev, [name]: value }))
                     }
                     required
                  />
               </div>
               <div>
                  <label htmlFor="price"></label>
                  <input
                     type="text"
                     id="price"
                     name="price"
                     placeholder="Add price"
                     value={data.price}
                     onChange={({ target: { name, value } }) =>
                        setData((prev) => ({ ...prev, [name]: value }))
                     }
                     required
                  />
               </div>
               <div>
                  <label htmlFor="description"></label>
                  <textarea
                     type="description"
                     id="price"
                     name="description"
                     placeholder="Add description"
                     value={data.description}
                     onChange={({ target: { name, value } }) =>
                        setData((prev) => ({ ...prev, [name]: value }))
                     }
                     required
                  />
               </div>
            </div>
            <div className="form__preview">
               <div {...getRootProps({ className: 'add-product-dropzone' })}>
                  <input {...getInputProps()} />
                  {files[0]?.preview ? (
                     <img
                        src={files[0].preview}
                        onLoad={() => {
                           URL.revokeObjectURL(files[0].preview);
                        }}
                        alt="pic"
                     />
                  ) : (
                     <p className="dnd-file">
                        Drag 'n' drop some files here, or click to select files
                     </p>
                  )}
               </div>
            </div>
            <div className="form__buttons">
               <button type="submit">Add Product</button>
               <button
                  type="button"
                  onClick={onClickClose}
               >
                  Close
               </button>
            </div>
         </form>
      </div>
   );
};
