const express = require("express");
const {
  addsubcategoryController,
  deleteSubCategoryController,
  updateSubcategoryController,
} = require("../../../controller/subcategoryController");

const router = express.Router();

router.post("/addsubcategory", addsubcategoryController);
router.delete("/deletesubcategory/:id", deleteSubCategoryController);
router.patch("/updatesubcategory/:id", updateSubcategoryController);

module.exports = router;
