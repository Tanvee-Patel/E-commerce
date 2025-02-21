import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/user/addressSlice'
import AddressCard from './AddressCard'
import toast from 'react-hot-toast'

const initialAddressFormData = {
   address: '',
   city: '',
   pincode: '',
   phone: '',
   notes: '',
}

const Address = ({ currentSelectedAddress, setCurrentSelectedAddress, selectedId }) => {
   const [formData, setFormData] = useState(initialAddressFormData)
   const [currentEditedId, setCurrentEditedId] = useState(null)
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.auth)
   const { addressList } = useSelector(state => state.userAddress)
   
   function handleManageAddress(e) {
      e.preventDefault()
      if (addressList.length >= 3 && currentEditedId === null) {
         setFormData(initialAddressFormData)
         toast.error('you can add maximum 3 addresses.')
         return;
      }
      currentEditedId !== null ?
         dispatch(editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData
         })) 
            .then((data) => {
               if (data?.payload?.success) {
                  dispatch(fetchAllAddress(user?.id))
                  setCurrentEditedId(null)
                  setFormData(initialAddressFormData)
                  toast.success('Address adited successfully')
               }
            })
         :
         dispatch(addNewAddress({
            ...formData,
            userId: user?.id,
         }))
            .then(data => {
               // console.log(data);
               if (data?.payload?.success) {
                  dispatch(fetchAllAddress(user?.id))
                  setFormData(initialAddressFormData)
                  toast.success("Address added successfully")
               }
            })
   }

   function isFormValid() {
      return Object.keys(formData)
         .map((key) => formData[key].trim() !== "")
         .every((item) => item)
   }

   function handleDeleteAddress(getCurrentAddress) {
      // console.log(getCurrentAddress );
      dispatch(deleteAddress({
         userId: user?.id,
         addressId: getCurrentAddress._id
      }))
         .then((data) => {
            if (data?.payload?.success) {
               dispatch(fetchAllAddress(user?.id))
               toast.success('Address deleted successfully')
            }
         })
   }

   function handleEditAddress(getCurrentAddress) {
      // console.log(getCurrentAddress)
      setCurrentEditedId(getCurrentAddress?._id);
      setFormData({
         ...formData,
         address: getCurrentAddress?.address,
         city: getCurrentAddress?.city,
         phone: getCurrentAddress?.phone,
         pincode: getCurrentAddress?.pincode,
         notes: getCurrentAddress?.notes
      })
   }

   useEffect(()=>{
      // console.log(currentSelectedAddress);
   },[currentSelectedAddress])

   useEffect(() => {
      if (user?.id) {
         dispatch(fetchAllAddress(user.id))
      }
   }, [dispatch, user?.id])

   // console.log("Address List:", addressList);

   return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
         <div className="w-full max-w-lg space-y-8">
            <div className="text-center">
               <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Manage Your Addresses</h1>
               <p className="text-xl text-gray-700 mb-6">Add, update, or remove your addresses with ease.</p>
            </div>

            <Card className="bg-white rounded-lg shadow-xl p-8 space-y-6 ring-2 ring-primary-300">
               <CardContent>
                  <div className="p-4 rounded-lg shadow-md">
                     {addressList && addressList.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                           {addressList.map((singleAddressItem) => (
                              <AddressCard
                                 key={singleAddressItem._id}
                                 addressInfo={singleAddressItem}
                                 handleDeleteAddress={handleDeleteAddress}
                                 handleEditAddress={handleEditAddress}
                                 selectedId={selectedId}
                                 setCurrentSelectedAddress={setCurrentSelectedAddress}
                                 className="border rounded-lg p-4 bg-white shadow" />
                           ))}
                        </div>
                     ) : (<p> No addresses found. </p>
                     )}
                  </div>

                  <CardHeader>
                     <CardTitle className="text-center text-2xl font-semibold">
                        {
                           currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                        }
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <Form
                        formControlls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={
                           currentEditedId !== null ? 'Edit' : 'Add'
                        }
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                     />
                  </CardContent>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default Address