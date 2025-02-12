const express = require ('express');
const { getAllOrderOfAllUsers, getAdminOrderDetails, updateOrderStatus } = require('../../controllers/admin/orderController');

const router = express.Router();

router.get('/get-orders', getAllOrderOfAllUsers)
router.get('/details/:id', getAdminOrderDetails)
router.put('/update/:id',updateOrderStatus)

module.exports = router;