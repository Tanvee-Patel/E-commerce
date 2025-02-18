const feature = require("../../models/features")

const addFeatureImage = async(req,res)=>{
   try {
      const { image } = req.body;
      const featureImages = new feature({
         image
      })

      await featureImages.save();

      res.status(200).json({
         success: true,
         data: featureImages
      })
      
   } catch (error) {
      console.log(error);
      
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching orders'
      });
   }
}

const getFeatureImages = async(req,res)=>{
   try {
      const images = await feature.find({})

      res.status(200).json({
         success: false,
         data: images
      });
      
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching orders'
      });
   }
}


module.exports = { addFeatureImage, getFeatureImages };