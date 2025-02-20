const Order = require ('../../models/order')

const getAllOrderOfAllUsers = async (req, res) =>{
   try {
      const orders = await Order.find()
      .populate({
         path: "userId",
         select: "email username"
      })

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

const getAdminOrderDetails = async (req, res) =>{
   try {
      const {id} = req.params;
      const order = await Order.findById(id)
      .populate({
         path: "userId",
         select: "email username"
      })

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

const updateOrderStatus = async (req,res)=>{
   try {
      const {id} = req.params;
      const {orderStatus} = req.body;
      const order = await Order.findById(id).populate('userId')

      if(!order){
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         })
      }

      order.orderStatus = orderStatus;
      await order.save()

      res.status(200).json({
         success: true,
         message: "Order status is updated",
         data: orderStatus
      })

      // if (orderStatus.toLowerCase() === 'confirmed' && order.userId?.email) {
      //    try {
      //       console.log(`Attempting to send email to: ${order.userId.email}`);
      //       const subject = 'Order Confirmed successfully!';
      //       const text = `Dear ${order.userId.username},\n\nYour order with ID ${order._id} has been confirmed!\n\nThank you for shopping with us.`;
      //       await sendMail(order.userId.email, subject, text);
      //       console.log(`Email sent to ${order.userId.email}`);
      //    } catch (emailError) {
      //       console.error("Error sending confirmation email:", emailError);
      //       res.status(500).json({ success: false, message: "Email sending failed" });        
      //    }
      //  }

   } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
         success: false,
         message: 'An error occurred while Fetching orders'
      });
   }
}

module.exports = { getAllOrderOfAllUsers, getAdminOrderDetails, updateOrderStatus };