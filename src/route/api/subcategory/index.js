const express = require("express");
const { addsubcategoryController } = require("../../../controller/subcategoryController");

const router = express.Router();

router.post("/addsubcategory",addsubcategoryController )


module.exports = router;
