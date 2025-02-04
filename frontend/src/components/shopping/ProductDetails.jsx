import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/user/cartSlice'
import toast from 'react-hot-toast'
import { setProductDetails } from '@/store/user/productSlice'

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const {user} = useSelector (state => state.auth)

  function handleAddToCart(productId){
    // console.log(productId);  
    dispatch(addToCart({userId: user?.id, productId, quantity: 1}))
    .then((data)=>{ 
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast.success('Product is added to cart successfully')
      }
    })
  }

  function handleCloseDialog(){
    setOpen(false)
    dispatch(setProductDetails())
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:p-8 p-6 max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] rounded-lg shadow-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <DialogTitle className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{productDetails?.title || "Loading..."}</DialogTitle>

        {productDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

              <img
                src={productDetails.image}
                alt={productDetails.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover rounded-xl"
              />
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-gray-900">{productDetails.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{productDetails.description}</p>

              <div className="flex items-center justify-between">
                <p
                  className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                    }`}
                >
                  ${productDetails?.price}
                </p>
                {productDetails?.salePrice > 0 ? (
                  <p className="text-2xl font-bold text-muted-foreground">
                    ${productDetails?.salePrice}
                  </p>
                ) : null}
              </div>

              <div className='flex items-center gap-2 mt-2'>
                <div className='flex items-center gap-0.5'>
                  <Star className='w-5 h-5 fill-primary'/>
                  <Star className='w-5 h-5 fill-primary'/>
                  <Star className='w-5 h-5 fill-primary'/>
                  <Star className='w-5 h-5 fill-primary'/>
                  <Star className='w-5 h-5 fill-primary'/>
                </div>
                <span className='text-muted-foreground'>(4.5)</span>
              </div>

              <Button 
              onClick={()=>handleAddToCart(productDetails?._id)}
              className="w-full bg-primary-500 text-cyan-700 hover:bg-primary-600 transition-all mt-4">
                Add to Cart
              </Button>

              <Separator />

              <div className='max-h-[300px] overflow-auto'>
                <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                <div className='grid gap-6'>
                  <div className='flex gap-4'>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className='grid gap-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-bold'>Vee</h3>
                      </div>
                      <div className='flex items-center gap-0.5'>
                        <Star className='w-5 h-5 fill-primary'/>
                        <Star className='w-5 h-5 fill-primary'/>
                        <Star className='w-5 h-5 fill-primary'/>
                        <Star className='w-5 h-5 fill-primary'/>
                        <Star className='w-5 h-5'/>
                      </div>
                      <p className='text-muted-foreground'>Good Product</p>
                    </div>
                  </div>
                </div>

                <div className='mt-6 flex gap-2'>
                  <Input placeholder="Write a Review" className="w-full p-4 border rounded-lg"/>
                  <Button className="p-4">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading product details...</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails
