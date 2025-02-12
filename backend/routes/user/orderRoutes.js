const express = require ('express');
const { createOrder, getAllOrderByUser, getOrderDetails } = require('../../controllers/user/orderController');

const router = express.Router();

router.post('/create', createOrder)
router.get('/list/:userId', getAllOrderByUser)
router.get('/details/:id', getOrderDetails)

module.exports = router;