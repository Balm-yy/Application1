const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,      //La donnée doit être une chaine de caractères
        required : true,   //Obligatoire
    },
    password : {
        type : String,      //La donnée doit être une chaine de caractères
        required : true,    //Obligatoire
    }
}, { timestamps : true}); //Ajoute automatiquement les dates de créations et mises à jours

module.exports = mongoose.model('User', userSchema)