import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import OrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderByUser, getOrderDetails, resetOrderDetails } from '@/store/user/orderSlice'
import { Badge } from '../ui/badge'

const Orders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orders: orderList = [], orderDetails } = useSelector(state => state.orders)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  useEffect(() => {
    dispatch(getAllOrderByUser(user?.id))
  }, [dispatch, user])

  // console.log("Order List", orderList);
  // console.log("Order Details", orderDetails);
  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true)
      console.log("Order Details", orderDetails);
    }
  }, [orderDetails])

  function handleFetchOrderDetails(getId) {
    // console.log("Id",getId);
    setSelectedOrderId(getId)
    dispatch(getOrderDetails(getId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
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
        onOpenChange={()=>{
          setOpenDetailsDialog(false)
          dispatch(resetOrderDetails())
        }}>
        <OrderDetails orderDetails={orderDetails} />
      </Dialog>
    </Card>
  )
}

export default Orders