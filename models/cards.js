const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true,
    },
    answer : {
        type : String,
        required : true,
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subcategory",
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    }
});

module.exports = mongoose.model("Card", cardSchema);