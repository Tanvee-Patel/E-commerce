const Order = require("../../models/order")
const Product = require("../../models/product")
const ProductReview = require("../../models/review")

const addProductReview = async (req, res) => {
   try {
      const { productId, userId, userName, ReviewMessage, reviewValue } = req.body;
      const order = await Order.findOne({
         userId,
         "cartItems.productId": productId,
         orderStatus: "confirmed"
      })

      if (!order) {
         return res.status(403).json({
            success: false,
            message: "You must have purchased this product to submit a review."
         })
      }

      const checkExistingReview = await ProductReview.findOne({ productId, userId })
      if (checkExistingReview) {
         return res.status(400).json({
            success: false,
            message: "You have already reviewed this product"
         })
      }

      const newReview = new ProductReview({
         productId, userId, userName, ReviewMessage, reviewValue
      })
      await newReview.save()

      const reviews = await ProductReview.findOne({productId})
      const totalReviewsLength = reviews.length;
      const avgReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength;

      await Product.findByIdAndUpdate(productId, {avgReview})
      res.status(500).json({
         success: true,
         data: newReview
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Error"
      })
   }
}

const getProductReviews = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         message: "Error"
      })
   }
}

module.exports = { addProductReview, getProductReviews }