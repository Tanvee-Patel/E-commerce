import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const OrderDetails = ({ orderDetails }) => {

   const {user} = useSelector (state => state.auth)  

   return (
      <DialogContent className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center ring-4">
         <div className="w-full max-w-lg rounded-lg p-8 space-y-6 ">
            <div className="text-center">
               <DialogTitle className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                  Order Details
               </DialogTitle>
            </div>
            <div className='grid gap-6'>
               <div className='grid gap-2'>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Id</p>
                     <Label className="mr-5">{orderDetails?._id}</Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Date</p>
                     <Label className="mr-5">{orderDetails?.orderDate.split('T')[0]}</Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Status</p>
                     <Label className="mr-5"><Badge className='py-1 px-2'>{orderDetails?.orderStatus}</Badge></Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Price</p>
                     <Label className="mr-5">${orderDetails?.totalAmount}</Label>
                  </div>
               </div>
               <Separator />
               <div className='grid gap-4'>
                  <div className='grid gap-2'>
                     <div className='font-extrabold'>
                        Order Details
                     </div>
                     <ul className='grid gap-3'>
                        <li className='flex items-center justify-between font-semibold border-b pb-2'>
                           <span className='w-1/2'>Product Name</span>
                           <span className='w-1/4 text-center'>Quantity</span>
                           <span className='w-1/4 text-right'>Price</span>
                        </li>
                        {
                           orderDetails?.cartItems && orderDetails.cartItems.length > 0 ?
                              orderDetails?.cartItems.map(item =>
                                 <li className='flex items-center justify-between'>
                                    <span className='w-1/2'>{item.title}</span>
                                    <span className='w-1/4 text-center'>{item.quantity}</span>
                                    <span className='w-1/4 text-right'>${item.price}</span>
                                 </li>) : null
                        }

                     </ul>
                  </div>
               </div>
               <Separator />
               <div className='grid gap-4'>
                  <div className='grid gap-2'>
                     <div className='font-medium'>
                        Shipping Info
                     </div>
                     <div className='grid gap-0.5 text-muted-foreground'>
                        <span>Username: {user.username}</span>
                        <span>Address: {orderDetails?.addressInfo?.address}
                        <span>, {orderDetails?.addressInfo?.city || 'N/A'}</span> </span>
                        <span>Pincode: {orderDetails?.addressInfo?.pincode || 'N/A'}</span>
                        <span>Phone: {orderDetails?.addressInfo?.phone || 'N/A'}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DialogContent>
   )
}

export default OrderDetails