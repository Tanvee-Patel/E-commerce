
export const registerFormControlls = [
   {
      name: 'username',
      label : 'Username',
      placeholder: 'Enter your username',
      commonType: 'input',
      type: 'text'
   },
   {
      name: 'email',
      label : 'Email',
      placeholder: 'Enter your email',
      commonType: 'input',
      type: 'email'
   },
   {
      name: 'password',
      label : 'Password',
      placeholder: 'Enter your password',
      commonType: 'input',
      type: 'password'
   },
]

export const loginFormControlls = [
   {
      name: 'email',
      label : 'Email',
      placeholder: 'Enter your email',
      commonType: 'input',
      type: 'email'
   },
   {
      name: 'password',
      label : 'Password',
      placeholder: 'Enter your password',
      commonType: 'input',
      type: 'password'
   },
];

export const addProductFormElements = [
   {
     label: "Title",
     name: "title",
     componentType: "input",
     type: "text",
     placeholder: "Enter product title",
   },
   {
     label: "Description",
     name: "description",
     componentType: "textarea",
     placeholder: "Enter product description",
   },
   {
     label: "Category",
     name: "category",
     componentType: "select",
     options: [
       { id: "electronics", label: "Electronics" },
       { id: "home-appliances", label: "Home Appliances" },
       { id: "clothing", label: "Clothing" },
       { id: "books", label: "Books" },
       { id: "furniture", label: "Furniture" },
     ],
   },
   {
     label: "Brand",
     name: "brand",
     componentType: "select",
     options: [
       { id: "apple", label: "Apple" },
       { id: "samsung", label: "Samsung" },
       { id: "sony", label: "Sony" },
       { id: "lg", label: "LG" },
       { id: "dell", label: "Dell" },
       { id: "ikea", label: "IKEA" },
       { id: "hp", label: "HP" },
       { id: "panasonic", label: "Panasonic" },
       { id: "philips", label: "Philips" },
       { id: "lenovo", label: "Lenovo" },
     ],
   },
   {
     label: "Price",
     name: "price",
     componentType: "input",
     type: "number",
     placeholder: "Enter product price",
   },
   {
     label: "Sale Price",
     name: "salePrice",
     componentType: "input",
     type: "number",
     placeholder: "Enter sale price (optional)",
   },
   {
     label: "Total Stock",
     name: "totalStock",
     componentType: "input",
     type: "number",
     placeholder: "Enter total stock",
   },
 ]; 