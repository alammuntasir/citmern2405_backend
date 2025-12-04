const { default: mongoose } = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    phone: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    city: {
      type: String,
      require: true,
    },

    deliverycharge: {
      type: String,
      enum: ["outsidedhaka", "insidedhaka"],
      default: "outsidedhaka",
    },
    paymentmethod: {
      type: String,
      enum: ["cod", "online"],
    },

    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        variant: {
          type: mongoose.Types.ObjectId,
          ref: "variant",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalprice:{
        type: Number,
        require: true
    },
    discount:{
        type: Number,
        
    },
    orderstatus:{
        type: String,
        enum: ["pending", "canceled","deliverd"],
        default: "pending"
    },
    trnd_id:{
        type: String,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
