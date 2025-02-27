import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import OrderDetail from './OrderDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminOrderDetails, getAllOrderOfAllUsers, resetOrderDetails, updateOrderStatus } from '@/store/admin/orderSlice'
import { Badge } from '../ui/badge'

const AOrders = () => {
   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
   const { orders: orderList = [], orderDetails } = useSelector(state => state.adminOrders)
   const dispatch = useDispatch()

   function handleFetchOrderDetails(getId) {
      dispatch(getAdminOrderDetails(getId))
      // setSelectedOrderId(getId)
   }

   useEffect(() => {
      dispatch(getAllOrderOfAllUsers())
   }, [dispatch])

   useEffect(() => {
      if (orderDetails !== null) {
         setOpenDetailsDialog(true)
      }
   }, [orderDetails])

   // console.log("Order Details", orderDetails);

   return (
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
         <div className="w-full max-w-4xl space-y-8">
            <Card className="bg-white rounded-xl shadow-xl p-8 ring-2 ring-primary-300">
               <CardHeader>
                  <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
                     All Orders
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Table className="w-full border-collapse border border-gray-200">
                     <TableHeader>
                        <TableRow className="bg-gray-100 border-b border-gray-400">
                           <TableHead className="px-6 py-3 text-left text-base font-medium text-gray-700">Order Id</TableHead>
                           <TableHead className="px-6 py-3 text-left text-base font-medium text-gray-700">Order Date</TableHead>
                           <TableHead className="px-6 py-3 text-left text-base font-medium text-gray-700">Order Status</TableHead>
                           <TableHead className="px-6 py-3 text-left text-base font-medium text-gray-700">Order Price</TableHead>
                           <TableHead className="px-6 py-3 text-left text-base font-medium text-gray-700"> Details
                              {/* <span className="sr-only">Details</span> */}
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {
                           orderList && orderList.length > 0 ? (
                              orderList.map((orderItem) => (
                                 <TableRow key={orderItem?._id}>
                                    <TableCell>{orderItem?._id}</TableCell>
                                    <TableCell className='w-full'>{orderItem?.orderDate.split('T')[0]}</TableCell>
                                    <TableCell>
                                       <Badge className='p-xy-1 px-2'>{orderItem?.orderStatus}</Badge>
                                    </TableCell>
                                    <TableCell>${orderItem?.totalAmount}</TableCell>
                                    <TableCell>
                                       <Button
                                       className='border border-sky-400'
                                          onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                                          View Details
                                       </Button>
                                    </TableCell>
                                 </TableRow>))
                           ) : null
                        }
                     </TableBody>
                  </Table>
               </CardContent>
               <Dialog
                  open={openDetailsDialog}
                  onOpenChange={() => {
                     setOpenDetailsDialog(false)
                     dispatch(resetOrderDetails())
                  }}>
                  <DialogContent aria-describedby="order-description">
                  <DialogTitle>Order Details</DialogTitle>
                     <p id="order-description">Order details and relevant information.</p>
                     <OrderDetail orderDetail={orderDetails} />
                  </DialogContent>
               </Dialog>
            </Card>
         </div>
      </div>
   );
};

export default AOrders;
