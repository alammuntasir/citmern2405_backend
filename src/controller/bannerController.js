const bannerModel = require("../model/banner.model");

let addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;
  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link
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

let deleteBannnerController = async (req, res) => {
  let { id } = req.params;
  try {

    let deleteBanner = await bannerModel.findByIdAndDelete(id);
    if (!deleteBanner){
      return res.status(404).json({success:false, message:"Id not found"})
    }
    return res
      .status(200)
      .json({ success: true, message: "banner deleted successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = { addBannerController, deleteBannnerController };
