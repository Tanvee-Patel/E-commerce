import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form'
import { addressFormControls } from '@/config'
import { useDispatch } from 'react-redux'

const initialAddressFormData = {
   address:'',
   city: '',
   pincode: '',
   phone: '',
   notes: '',
}

const Address = () => {
   const [formData, setFormData] = useState(initialAddressFormData)
   const dispatch= useDispatch()

   function handleManageAddress(e){
      e.preventDefault()
   }

   function isFormValid(){
      return Object.keys(formData)
      .map((key)=>formData[key].trim() !== "")
      .every((item)=>item)
   }

   return (
      <Card>
         <div>
            Address List
         </div>
         <CardHeader>
            <CardTitle>Add New Address</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            <Form 
            formControlls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Add'}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid}
            />
         </CardContent>
      </Card>
   )
}

export default Address