import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import OrderDetail from './OrderDetail'

const AOrders = () => {
   const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
   return (
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
         <div className="w-full max-w-4xl space-y-8">
            <Card className="bg-white rounded-lg shadow-xl p-8 ring-2 ring-primary-300">
               <CardHeader>
                  <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
                     All Orders
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Table className="w-full border-collapse border border-gray-200">
                     <TableHeader>
                        <TableRow className="bg-gray-100">
                           <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order Id</TableHead>
                           <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order Date</TableHead>
                           <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order Status</TableHead>
                           <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order Price</TableHead>
                           <TableHead className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              <span className="sr-only">Details</span>
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow className="border-b border-gray-200 hover:bg-gray-50">
                           <TableCell className="px-6 py-4 text-gray-800">2345678</TableCell>
                           <TableCell className="px-6 py-4 text-gray-800">17/06/2024</TableCell>
                           <TableCell className="px-6 py-4 text-gray-800">In Progress</TableCell>
                           <TableCell className="px-6 py-4 text-gray-800">$1000</TableCell>
                           <TableCell className="px-6 py-4 text-right">
                              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                 <Button
                                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-cyan-500"
                                    onClick={() => setOpenDetailsDialog(true)}
                                 >
                                    View Details
                                 </Button>
                                 <OrderDetail OrderDetail={OrderDetail} />
                              </Dialog>
                           </TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default AOrders;
