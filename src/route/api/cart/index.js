const express = require("express");
const {
  addtocartController,
  getAllcartListController,
  singleusercartController,
  updatequantityController,
} = require("../../../controller/cartController");

const router = express.Router();

router.post("/addtocart", addtocartController);
router.get("/getallcarts", getAllcartListController);
router.get("/singleusercart/:id", singleusercartController);

router.patch("/updatequantity/:id",updatequantityController)

module.exports = router;
