const bannerModel = require("../model/banner.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

let addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;
  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });
    await banner.save();
    return res.status(201).json({
      success: true,
      message: "banner created successfully",
      data: banner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
//banner delete..
let deleteBannnerController = async (req, res) => {
  let { id } = req.params;
  let deleteBanner = await bannerModel.findByIdAndDelete(id);
  let imageurl = deleteBanner.image.split("/");
  let filepath = path.join(__dirname, "../../uploads");

  fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
    if (err) {
      console.log(err, "error");
    }
  });

  // try {

  //   let deleteBanner = await bannerModel.findByIdAndDelete(id);
  //   if (!deleteBanner){
  //     return res.status(404).json({success:false, message:"Id not found"})
  //   }
  //   return res
  //     .status(200)
  //     .json({ success: true, message: "banner deleted successfull" });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: error.message || error });
  // }
};
// update banner

let updateBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;
    let findBanner = await bannerModel.findOne({ _id: id });

    if (findBanner) {
      //old image path delete
      let imageurl = findBanner.image.split("/");
      let filepath = path.join(__dirname, "../../uploads");

      fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
        if (err) {
          console.log(err, "error");
        }
      });
      //old image path delete

      // findBanner.image = `${process.env.SERVER_URL}/${filename}` ;

      // await findBanner.save();

      let update = await bannerModel.findOneAndUpdate(
        { _id: id },
        { image: `${process.env.SERVER_URL}/${filename}` },
        { new: true }
      );
      await update.save();
      return res.status(200).json({
        success: true,
        message: "banner updated successfull",
        data: update,
      });
    } else {
      res.status(404).json({ success: false, message: "banner not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

//get all banners
let allBannersController = async (req, res) => {
  try {
    let allbanners = await bannerModel.find({});
    if (allbanners.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "banner fetch successfull",
        data: allbanners,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = {
  addBannerController,
  deleteBannnerController,
  updateBannerController,
  allBannersController,
};
