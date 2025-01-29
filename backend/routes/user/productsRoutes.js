const express = require ('express')
const {getFilteredProducts} = require('../../controllers/user/productsController')

const router = express.Router()

router.get('/get',getFilteredProducts)

module.exports = router;