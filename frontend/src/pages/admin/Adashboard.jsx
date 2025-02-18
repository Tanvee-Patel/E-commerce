import ImageUpload from '@/components/admin/ImageUpload'
import { Button } from '@/components/ui/button'
import { addFeatureImage, getFeatureImages } from '@/store/commonSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Adashboard = () => {
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { featureImageList } = useSelector(state => state.commonFeature)

  console.log("URL", uploadedImageUrl);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      alert('Please upload an image before submitting.')
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null)
          setUploadedImageUrl('')
        } else {
          console.error('Image upload failed:', data?.payload?.message);
        }
      })
      .catch((err) => console.error('Upload error:', err));
  }


  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  console.log("List", featureImageList);

  return (
    <div>
      <h1>Upload Feature Images</h1>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full">
        Upload
      </Button>
      <div className='mt-5'>
        {
          featureImageList?.length > 0 ? (
            featureImageList.map((featureImageItem) => (
              <div className='relative' key={featureImageItem?._id}>
                <img
                  src={featureImageItem?.image}
                  className='w-full h-[300px] object-cover rounded-t-lg'
                />
              </div>
            ))
          ) : (
            <p>No images found.</p>
          )}
      </div>
    </div>
  )
}

export default Adashboard 