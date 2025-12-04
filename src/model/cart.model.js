const { default: mongoose } = require("mongoose");
const cartSchema = new mongoose.Schema(
   {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      require: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    variant: {
      type: mongoose.Types.ObjectId,
      ref: "variant",
    },
    totalprice: {
      type: Number,
      require: true,
    },
  }, 

  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
