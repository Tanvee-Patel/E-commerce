export const registerFormControlls = [
  {
    name: 'username',
    placeholder: 'Username',
    commonType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    commonType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    commonType: 'input',
    type: 'password',
  },
]

export const loginFormControlls = [
  {
    name: 'email',
    placeholder: 'Email',
    commonType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Password',
    commonType: 'input',
    type: 'password',
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
      { id: "books", label: "Books" },
      { id: "beauty", label: "Beauty & Personal Care" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      // Electronics brands
      { id: "apple", label: "Apple", category: "electronics" },
      { id: "samsung", label: "Samsung", category: "electronics" },
      { id: "sony", label: "Sony", category: "electronics" },
      { id: "lg", label: "LG", category: "electronics" },
      // Books brands
      { id: "penguin", label: "Penguin", category: "books" },
      { id: "harpercollins", label: "HarperCollins", category: "books" },
      // Beauty brands
      { id: "loreal", label: "L'Oreal", category: "beauty" },
      { id: "maybelline", label: "Maybelline", category: "beauty" },
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

export const shoppingViewHeaderMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/user/home',
  },
  {
    id: 'products',
    label: 'Products',
    path: '/user/listing',
  },
  {
    id: 'electronics',
    label: 'Electronics',
    path: '/user/listing',
  },
  {
    id: 'books',
    label: 'Books',
    path: '/user/listing',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    path: '/user/listing'
  },
  {
    id: 'search',
    label: 'Explore',
    path: '/user/search',
  },
];

export const filterOptions = {
  category: [
    { id: "electronics", label: "Electronics" },
    { id: "books", label: "Books" },
    { id: "beauty", label: "Beauty & Personal Care" },
  ],
  brand: [
    // Electronics brands
    { id: "apple", label: "Apple", category: "electronics" },
    { id: "samsung", label: "Samsung", category: "electronics" },
    { id: "sony", label: "Sony", category: "electronics" },
    { id: "lg", label: "LG", category: "electronics" },
    // Books brands
    { id: "penguin", label: "Penguin", category: "books" },
    { id: "harpercollins", label: "HarperCollins", category: "books" },
    // Beauty brands
    { id: "loreal", label: "L'Oreal", category: "beauty" },
    { id: "maybelline", label: "Maybelline", category: "beauty" },
  ]
}

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
]

export const addressFormControls = [
  {
    // label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Address",
  },
  {
    // label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "City",
  },
  {
    // label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Pincode",
  },
  {
    // label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Phone Number",
  },
  {
    // label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Additional Notes",
  },
];