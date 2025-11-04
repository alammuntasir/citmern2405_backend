const { default: mongoose } = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true
    },
   slug:{
    type: String,

   }
  },
  { timestamps: true }
);


module.exports = mongoose.model("subCategory", subCategorySchema);

//subcategorys