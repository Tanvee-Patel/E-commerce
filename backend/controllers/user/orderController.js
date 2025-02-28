const Order = require('../../models/order')
const paypal = require('../../helpers/paypal')
const Cart = require("../../models/cart")
const Product = require("../../models/product")

const createOrder = async (req, res) => {
   try {
      console.log("Createing order with data", req.body);

      const { userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount } = req.body;

      if (!userId || !cartId || !cartItems || cartItems.length === 0 || !addressInfo || !totalAmount || !paymentMethod || !paymentStatus) {
         return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const cart = await Cart.findById(cartId)
         .populate("items.productId")
      console.log("Cart:", cart);

      const computedTotal = cart.items.reduce((sum, item) => {
         const product = item.productId;
         if (!product || (!product.price && !product.salePrice)) {
            console.error("Product missing price:", product);
            return sum;
         }
         const finalPrice = product.salePrice > 0 ? product.salePrice : product.price;
         return sum + (finalPrice * item.quantity);
      }, 0);

      console.log(`Expected Total: ${totalAmount.toFixed(2)}, Computed Total: ${computedTotal}`);

      if (Math.abs(computedTotal - totalAmount) > 0.01) {
         console.error('Total amount mismatch! Please check your calculations.');
         return res.status(400).json({ success: false, message: 'Total amount mismatch' });
      }

      const newOrder = new Order({
         userId,
         cartId,
         cartItems: cart.items.map(item => ({
            productId: item.productId._id, 
            title: item.productId.title,
            image: item.productId.image,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
         })),
         addressInfo,
         orderStatus: orderStatus || 'Pending',
         totalAmount: computedTotal,
         orderDate: new Date(),
         orderUpdateDate: new Date(),
         paymentMethod,
         paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      });

      await newOrder.save();
      console.log("New Order", newOrder);

      const create_payment_json = {
         intent: 'sale',
         payer: {
            payment_method: 'paypal'
         },
         redirect_urls: {
            return_url: 'http://localhost:5173/user/paypal-return?orderId=' + newOrder._id,
            cancel_url: 'http://localhost:5173/user/paypal-cancel'
         },
         transactions: [
            {
               item_list: {
                  items: cart.items.map(item => {
                     const product = item.productId;
                     const finalPrice = (product.salePrice > 0 ? product.salePrice : product.price) || 0;
                     if (!product || (!product?.price && !product?.salePrice)) {
                        console.error("Product missing price:", product);
                        return null;
                     }
                     return {
                        name: product.title,
                        sku: product._id.toString(),
                        price: finalPrice.toFixed(2),
                        currency: 'USD',
                        quantity: item.quantity
                     }
                  }).filter(Boolean)
               },
               amount: {
                  currency: 'USD',
                  total: totalAmount.toFixed(2).toString()
               },
               description: 'description'
            }
         ]
      }

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
         if (error) {
            console.error('PayPal Error:', JSON.stringify(error.response, null, 2));
            return res.status(500).json({
               success: false,
               message: 'Error while creating payment'
            })
         }
         else {

            const approvalURL = paymentInfo?.links?.find((link) => link.rel === 'approval_url')?.href;
            if (!approvalURL) {
               return res.status(500).json({
                  success: false,
                  message: 'Approval URL not found in PayPal response'
               });
            }
            // const newOrder = new Order({...orderUpdateDate, approvalURL})

            res.status(201).json({
               success: true,
               message: 'Order created successfully',
               approvalURL,
               orderId: newOrder._id,
            });
         }
      })
   } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while creating the order'
      });
   }
};

const getAllOrderByUser = async (req, res) => {
   try {
      const { userId } = req.params;
      const orders = await Order.find({ userId })
         .populate({ path: "userId", select: "email username" }) // Fetch email & username
         .lean();

      if (!orders.length) {
         return res.status(404).json({
            success: false,
            message: 'No orders found'
         })
      }

      res.status(200).json({
         success: true,
         data: orders
      })

   } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching orders'
      });
   }
}

const getOrderDetails = async (req, res) => {
   try {
      const { id } = req.params
      const order = await Order.findById(id)
         .populate({ path: "userId", select: "email username" }) // Fetch email & username
         .lean();

      if (!order) {
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         })
      }

      res.status(200).json({
         success: true,
         data: order
      })

   } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching orders'
      });
   }
}

const capturePayment = async (req, res) => {
   try {
      const { paymentId, payerId, orderId } = req.body;
      console.log("Capture payment", req.body);

      if (!paymentId || !payerId || !orderId) {
         return res.status(400).json({
            success: false,
            message: 'Missing payment parameters'
         });
      }

      let order = await Order.findById(orderId)

      if (!order) {
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         })
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = paymentId;
      order.payerId = payerId;

      for (let item of order.cartItems) {
         // const productId = item.productId
         const productId = (typeof item.productId === 'object' && item.productId._id)
            ? item.productId._id
            : item.productId;

         let product = await Product.findById(productId);

         if (!product) {
            return res.status(404).json({
               success: false,
               message: `Not enough stock for this product ${product.title}`,
            });
         }

         if (product.totalStock < item.quantity) {
            return res.status(400).json({
               success: false,
               message: `Not enough stock for product ${product.title}.`
            });
         }

         product.totalStock -= item.quantity;
         await product.save();
      }
      await Cart.findByIdAndDelete(order.cartId);

      await order.save();

      res.status(200).json({
         success: true,
         message: "Order Confirmed",
         data: order
      })

   } catch (error) {
      console.error('Error fetching payment:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching payment'
      });
   }
}

module.exports = { createOrder, getAllOrderByUser, getOrderDetails, capturePayment };