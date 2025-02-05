import React, { useEffect, useState } from 'react'
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import banner3 from "../../assets/banner3.png"
import { Button } from '@/components/ui/button'
import { Armchair, Bed, Book, BookOpen, BoomBox, Brush, ChevronLeft, ChevronRight, Droplet, Dumbbell, LibraryBig, Lightbulb, Monitor, Palette, Plug, Puzzle, ShoppingBasket, Smartphone, Tablet, Tv, WandSparkles, WashingMachine } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/user/productSlice'
import ProductTile from '@/components/shopping/ProductTile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/user/cartSlice'
import toast from 'react-hot-toast'
import ProductDetails from '@/components/shopping/ProductDetails'

const categories = [
  { id: "electronics", label: "Electronics", icon: BoomBox },
  { id: "appliances", label: "Appliances", icon: WashingMachine },
  { id: "furniture", label: "Furniture", icon: Armchair },
  { id: "groceries", label: "Groceries", icon: ShoppingBasket },
  { id: "books", label: "Books", icon: LibraryBig },
  { id: "toys", label: "Toys", icon: Puzzle },
  { id: "beauty", label: "Beauty & Personal Care", icon: WandSparkles },
  { id: "sports", label: "Sports & Fitness", icon: Dumbbell },
]

const brand = [
  // Electronics brands
  { id: "apple", label: "Apple", icon: Smartphone },
  { id: "samsung", label: "Samsung", icon: Tablet },
  { id: "sony", label: "Sony", icon: Tv },
  { id: "lg", label: "LG", icon: Monitor },
  // Appliances brands
  { id: "philips", label: "Philips", icon: Lightbulb },
  { id: "panasonic", label: "Panasonic", icon: Plug },
  // Furniture brands
  { id: "ikea", label: "IKEA", icon: Bed },
  // Books brands
  { id: "penguin", label: "Penguin", icon: BookOpen },
  { id: "harpercollins", label: "HarperCollins", icon: Book },
  // Beauty brands
  { id: "loreal", label: "L'Oreal", icon: Droplet },
  { id: "maybelline", label: "Maybelline", icon: Brush },
  { id: "mac", label: "MAC", icon: Palette },
]

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { productList, productDetails } = useSelector(state => state.userProducts)
  const slides = [banner1, banner2, banner3]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  function handleNavigateToListingPage(section, getCurrentItem) {
    const validSections = ['category', 'brand'];
    if (!validSections.includes(section)) {
      console.error("Invalid section");
      return;
    }
    if (!getCurrentItem || !getCurrentItem.id) {
      console.error("Invalid item or item ID");
      return;
    }
    if (typeof section !== "string" || !section.trim()) {
      console.error("Invalid section");
      return;
    }
    if (!getCurrentItem || !getCurrentItem.id) {
      console.error("Invalid item or item ID");
      return;
    }
    sessionStorage.removeItem('filters');
    const currentFilter = JSON.parse(sessionStorage.getItem('filters')) || {}
    currentFilter[section] = [getCurrentItem.id]
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/user/listing')
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id))
          toast.success('Product is added to cart successfully')
        }
      })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: {},
      sortParams: 'price-lowtohigh'
    }))
  }, [dispatch])
  // console.log(productList);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            alt={`Banner ${index + 1}`}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 shadow-lg hover:bg-white"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
          }>
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Button>
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 shadow-lg hover:bg-white"
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      <section className="py-16 bg-white shadow-lg rounded-lg mx-4 my-8 ring-2 ring-primary-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((categoryItem, index) => (
              <Card
                key={index}
                onClick={() => {
                  handleNavigateToListingPage('category', categoryItem,);
                }}
                className="cursor-pointer hover:shadow-2xl transition-all bg-gray-50 rounded-lg">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  {React.createElement(categoryItem.icon, { className: "w-14 h-14 mb-4 text-primary" })}
                  <span className="text-lg font-semibold text-gray-900">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 mx-4 my-8 bg-white shadow-lg rounded-lg ring-2 ring-primary-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brand.map((brandItem, index) => (
              <Card
                key={index}
                onClick={() => {
                  handleNavigateToListingPage('brand', brandItem,);
                }}
                className="cursor-pointer hover:shadow-2xl transition-all bg-gray-50 rounded-lg">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <brandItem.icon className="w-14 h-14 mb-4 text-primary" />
                  <span className="text-lg font-semibold text-gray-900">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 mx-4 my-8 bg-white shadow-lg rounded-lg ring-2 ring-primary-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList && productList.length > 0 ? productList.map((productItem, index) => (
              <ProductTile
                key={index}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddToCart={handleAddToCart} />
            )) : null}
          </div>
        </div>
      </section>

      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

    </div>
  );
};

export default Home;