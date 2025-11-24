const { default: mongoose } = require("mongoose");
const variantSchema = new mongoose.Schema(
  {
     product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },

    
    size: {
      type: String,
      
      unique: true
    },
   stock:{
    type: Number
   },

  },
  { timestamps: true }
);


module.exports = mongoose.model("variant", variantSchema);

