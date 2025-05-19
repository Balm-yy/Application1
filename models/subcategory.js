const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true,
    }
});

module.exports = mongoose.model("Subcategory", subcategorySchema);