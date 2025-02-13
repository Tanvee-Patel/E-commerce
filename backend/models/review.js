const mongoose = require('mongoose')

const ProductReviewSchema = new mongoose.Schema({
   productId: String,
   userId: String,
   userName: String,
   ReviewMessage: String,
   reviewValue: Number
}, {
   timestamps: true
})

module.exports = mongoose.model('ProductReview', ProductReviewSchema)