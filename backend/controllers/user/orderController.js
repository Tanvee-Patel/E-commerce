
const Order = require ('../../models/order')
const { sendMail } = require ('../../models/mailer')

const createOrder = async (req, res) => {
   try {
      const { userId, cartId, cartItems, addressInfo, totalAmount, orderStatus } = req.body;
      
      if (!userId || !cartId || !cartItems || cartItems.length === 0 || !addressInfo || !totalAmount) {
         return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      
      const newOrder = new Order({
         userId,
         cartId,
         cartItems,
         addressInfo,
         orderStatus: orderStatus || 'Pending',
         totalAmount,
         orderDate: new Date(),
         orderUpdateDate: new Date()
      });
      
      await newOrder.save();
      
      if (newOrder.orderStatus === 'Confirmed') {
         try {
            await sendMail(addressInfo.address, 'Order Status Update', `Your order with ID: ${newOrder._id} is now being processed.`);
         } catch (mailError) {
            console.error('Failed to send order processing email:', mailError);
         }
      }
      
      res.status(201).json({
         success: true,
         message: 'Order created successfully',
         order: newOrder
      });
   } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while creating the order'
      });
   }
};

const getAllOrderByUser = async (req, res) =>{
   try {
      const {userId} = req.params;
      const orders = await Order.find({userId})

      if(!orders.length){
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

const getOrderDetails = async (req, res) =>{
   try {
      const {id} = req.params;
      const order = await Order.findById(id)

      if(!order){
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

module.exports = { createOrder, getAllOrderByUser, getOrderDetails };