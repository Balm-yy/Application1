const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',   //Relie cette catégorie à un doucment du modèle User
        required : true,
    }
});

module.exports = mongoose.model('Category', categorySchema);