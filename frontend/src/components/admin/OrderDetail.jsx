import React, { useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import Form from '../common/Form'

const initialFormData = {
   status: ''
}

const OrderDetail = () => {
   const [formData, setFormData] = useState(initialFormData)

   function handleUpdateStatus(e) {
      e.preventDefault()
   }

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
                     <Label className="mr-5">12345</Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Date</p>
                     <Label className="mr-5">12/02/2025</Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Status</p>
                     <Label className="mr-5">In Progress</Label>
                  </div>
                  <div className='flex items-center justify-between'>
                     <p className='font-medium'>Order Price</p>
                     <Label className="mr-5">1000</Label>
                  </div>
               </div>
               <Separator />
               <div className='grid gap-4'>
                  <div className='grid gap-2'>
                     <div className='font-medium'>
                        Order Details
                     </div>
                     <ul className='grid gap-3'>
                        <li className='flex items-center justify-between'>
                           <span>Product One</span>
                           <span>$100</span>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className='grid gap-4'>
                  <div className='grid gap-2'>
                     <div className='font-medium'>
                        Shipping Info
                     </div>
                     <div className='grid gap-0.5 text-muted-foreground'>
                        <span>User name</span>
                        <span>Address</span>
                        <span>City</span>
                        <span>Pincode</span>
                        <span>Phone</span>
                        <span>Notes</span>
                     </div>
                  </div>
               </div>
               <div>
                  <Form
                     formControlls={[
                        {
                           label: "Order Status",
                           name: "status",
                           componentType: "select",
                           options: [
                              { id: "pending", label: "Pending" },
                              { id: "confirmed", label: "Confirmed" },
                              { id: "processing", label: "Processing" },
                              { id: "shipped", label: "Shipped" },
                              { id: "out_for_delivery", label: "Out for Delivery" },
                              { id: "delivered", label: "Delivered" },
                              { id: "cancelled", label: "Cancelled" },
                              { id: "returned", label: "Returned" }
                           ]
                        }
                     ]}
                     formData={formData}
                     setFormData={setFormData}
                     buttonText={'Update Order Status'}
                     onSubmit={handleUpdateStatus}
                  />
               </div>
            </div>
         </div>
      </DialogContent>
   )
}

export default OrderDetail