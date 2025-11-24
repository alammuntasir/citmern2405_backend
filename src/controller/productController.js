const { default: slugify } = require("slugify");
const productModel = require("../model/product.model");
const varientModel = require("../model/varient.model");
const path = require("path");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      variantType,
      reviews,
      discountprice,
      price,
      stock,
    } = req.body;
    let slug = slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let imagefile = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`;
    });
    let product = new productModel({
      title,
      description,
      category,
      variantType,
      reviews,
      discountprice,
      price,
      stock,
      slug,
      image: imagefile,
    });

    await product.save();

    return res
      .status(201)
      .json({ success: true, message: "product created", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params;

    let findproduct = await productModel.findById(id);

    findproduct.image.forEach((url) => {
      let imageurl = url.split("/");

      let imagepath = imageurl[imageurl.length - 1];
      let uploadfolder = path.join(__dirname, "../../uploads");

      fs.unlink(uploadfolder + "/" + imagepath, (err) => {
        if (err) return res.send(500).json({ success: false, message: err });
      });
    });

    await productModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "true", message: "product deleted successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const allProductController = async (req, res) => {
  try {
    let products = await productModel
      .find({})
      .populate({ path: "variants", select: "size stock -_id" });
    return res.status(200).json({
      success: true,
      message: "products fetch successfull",
      data: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
const latestProductController = async (req, res) => {
  try {
    let products = await productModel
      .find({})
      .populate({ path: "variants", select: "size stock -_id" })
      .sort({ createdAt: -1 })
      .limit(1);
    return res.status(200).json({
      success: true,
      message: "products fetch successfull",
      data: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
const creatVariantController = async (req, res) => {
  try {
    let { size, stock, product } = req.body;

    let variant = new varientModel({
      size,
      stock,
      product,
    });
    await variant.save();
    await productModel.findOneAndUpdate(
      { _id: product },
      { $push: { variants: variant._id } }
    );
    return res.status(201).json({
      success: true,
      message: "variant created successfull",
      data: variant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
module.exports = {
  createProductController,
  creatVariantController,
  allProductController,
  latestProductController,
  deleteProductController,
};
