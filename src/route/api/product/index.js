const express = require('express')
const { createProductController, creatVariantController, allProductController, latestProductController, deleteProductController } = require('../../../controller/productController')
const upload = require('../../../utils/upload')
const router = express.Router()

router.post("/create",upload.array("product"),createProductController)
router.get("/products",allProductController)
router.get("/leatestproduct",latestProductController)
router.delete("/deleteproduct/:id",deleteProductController)


// variant route

router.post("/addvariant", creatVariantController)

module.exports = router