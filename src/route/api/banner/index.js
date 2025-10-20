const express = require("express");
const {
  addBannerController,
  deleteBannnerController,
  updateBannerController,
  allBannersController,
} = require("../../../controller/bannerController");

const router = express.Router();
const path = require("path");
const {
  TokenCheckMiddelware,
  adminCheck,
} = require("../../../utils/authMiddelware");
const upload = require("../../../utils/upload");

// http://localhost:3000/api/v1/banner/addbanner
router.post("/addbanner", upload.single("banner"), addBannerController);
router.delete("/deletebanner/:id", deleteBannnerController);
// router.delete(
//   "/deletebanner/:id",
//   TokenCheckMiddelware,
//   adminCheck,
//   deleteBannnerController
// );

router.patch(
  "/updatebanner/:id",
  upload.single("banner"),
  updateBannerController
);

router.get("/allbanners",allBannersController )

module.exports = router;
