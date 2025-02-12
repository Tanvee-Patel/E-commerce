import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress }) => {
   return (
      <Card className="border rounded-lg shadow-md bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
         <CardContent className="p-4 space-y-2">
            <div className="flex flex-col">
               <Label className="text-gray-700 font-semibold">Address:</Label>
               <p className="text-gray-600">{addressInfo?.address}</p>
            </div>
            <div className="flex flex-col">
               <Label className="text-gray-700 font-semibold">City:</Label>
               <p className="text-gray-600">{addressInfo?.city}</p>
            </div>
            <div className="flex flex-col">
               <Label className="text-gray-700 font-semibold">Pincode:</Label>
               <p className="text-gray-600">{addressInfo?.pincode}</p>
            </div>
            <div className="flex flex-col">
               <Label className="text-gray-700 font-semibold">Phone:</Label>
               <p className="text-gray-600">{addressInfo?.phone}</p>
            </div>
            <div className="flex flex-col">
               <Label className="text-gray-700 font-semibold">Notes:</Label>
               <p className="text-gray-600">{addressInfo?.notes}</p>
            </div>
         </CardContent>
         <CardFooter className='flex justify-between'>
            <Button onClick={()=> handleEditAddress(addressInfo)}>Edit</Button>
            <Button onClick={()=> handleDeleteAddress(addressInfo)}>Delete</Button>
         </CardFooter>
      </Card>
   );
};

export default AddressCard;
