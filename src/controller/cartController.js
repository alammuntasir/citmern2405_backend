const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

const addtocartController = async (req, res) => {
  try {
    let { user, product, quantity, variant } = req.body;

    let productinfo = await productModel.findById(product);

    let totalprice = productinfo.discountprice * quantity;

    if (productinfo.variantType == "multiVariant") {
      if (!variant) {
        return res
          .status(404)
          .json({ success: false, message: "variant is required" });
      } else {
        let addtocart = new cartModel({
          user,
          product,
          quantity,
          variant,
          totalprice,
        });

        await addtocart.save();

        return res.status(201).json({
          success: true,
          message: "product added to cart",
          data: addtocart,
        });
      }
    } else {
      let addtocart = new cartModel({
        user,
        product,
        quantity,
        totalprice,
      });

      await addtocart.save();

      return res.status(201).json({
        success: true,
        message: "product added to cart",
        data: addtocart,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getAllcartListController = async (req, res) => {
  try {
    let allcartlist = await cartModel
      .find({})
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "product",
        select: "title image discountprice price variant",
      })
      .populate({
        path: "variant",
        select: "size stock-_id variantType",
      });

    return res.status(200).json({
      success: true,
      message: "cart fetch successfully",
      data: allcartlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const singleusercartController = async (req, res) => {
  try {
    let { id } = req.params;
    let cartlist = await cartModel
      .find({ user: id })
      .select("-user")

      .populate({
        path: "product",
        select: "title image discountprice price variant",
      })
      .populate({
        path: "variant",
        select: "size stock-_id",
      });
    return res
      .status(200)
      .json({ success: true, message: "single user cart", data: cartlist });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const updatequantityController = async (req, res) => {
  try {
    let { quantity } = req.body;
    let {id}= req.params;
    let product = await cartModel.findOneAndUpdate(
      { product: id },
      { quantity },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "update quantity", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = {
  addtocartController,
  getAllcartListController,
  singleusercartController,
  updatequantityController,
};
