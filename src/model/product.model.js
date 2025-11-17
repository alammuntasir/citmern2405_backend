const { default: mongoose } = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name is required"],
      unique: true,
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
        type: string,
      },
    ],
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
    },
    variants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "variant",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
