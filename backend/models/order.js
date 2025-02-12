const mongoose = require ("mongoose")

const OrderSchema = new mongoose.Schema({
   userId: String,
   cartId: String,
   cartItems:[
      {
         productId: String,
         title: String, 
         image: String,
         price: Number,
         salePrice: Number,
         quantity: Number
      }
   ],
   addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      Notes: String
   },
   orderStatus: String, 
   totalAmount: Number,
   orderDate: Date,
   orderUpdateDate: Date
})

module.exports = mongoose.model('Order', OrderSchema)