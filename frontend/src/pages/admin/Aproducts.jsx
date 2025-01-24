import ImageUpload from '@/components/admin/ImageUpload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { addNewProduct, fetchAllProducts } from '@/store/admin/productSlice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Aproducts = () => {
  const initialFormData= {
    image: null,
    title: "",
    description: "",
    category: '',
    brand: '',
    price: "",
    salePrice: "",
    totalStock: "",
    // averageReview: 0,
  }
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState (initialFormData)
  const [imageFile, setImageFile]= useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState]=useState(false)
  const dispatch = useDispatch()
  const {productList} = useSelector(state=>state.adminProducts)

  function onSubmit(e){
    e.preventDefault();  
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    }))
    .then((data)=>{
      console.log(data);
      
    })
  }

  useEffect(()=>{
    dispatch(fetchAllProducts)
  },[dispatch])

  // console.log("Product List:",productList,uploadedImageUrl);
    
  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false)
        }}>
        <SheetContent
          side="right"
          className="overflow-auto"
          aria-describedby="add-product-description">
          <SheetHeader>
            <SheetTitle>
              Add New Product
            </SheetTitle>
            <div id="add-product-description">
              Fill out the form below to add a new product.
            </div>
          </SheetHeader>
          <ImageUpload 
          imageFile={imageFile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
          />
          <div className='py-6'>
            <Form
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText='Add'
            formControlls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Aproducts