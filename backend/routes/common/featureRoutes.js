const express = require("express")

const { addFeatureImage, getFeatureImages } = require('../../controllers/admin/featureController')

const router = express.Router()

router.post('/add', addFeatureImage)
router.get('/get', getFeatureImages)

module.exports = router;