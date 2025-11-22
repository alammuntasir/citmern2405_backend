const { default: mongoose } = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    image: {
      type: Array,
      require: [true, "image is required"],
    },

    description: {
      type: String,
      require: [true, "description is required"],
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discountprice: {
      type: Number,
    },
    reviews: [
      {
        type: String,
      },
    ],
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
    },
    variants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Variant",
      },
    ],
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Product", productSchema);
