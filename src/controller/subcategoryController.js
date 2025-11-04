let slugify = require("slugify");
const subcategoryModel = require("../model/subcategory.model");
let addsubcategoryController = async(req,res)=>{
try {
   let {name}= req.body;
    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addsubcategory = new subcategoryModel({
        

    })
} catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
}
}

module.exports={addsubcategoryController}