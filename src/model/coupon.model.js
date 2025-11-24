const { default: mongoose } = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "image is required"],
    },

    minPrice:{
        type: Number,
        require: true,
    },
    amount:{
        type: Number,
        require: true
    }


  },
  { timestamps: true }
);


module.exports = mongoose.model("Coupon", couponSchema);
