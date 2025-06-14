const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //Je pense qu'il faut télécharger cette bibliothèque

const userSchema = new mongoose.Schema({
    name : {
        type : String,      //La donnée doit être une chaine de caractères
        required : true,   //Obligatoire
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,      //La donnée doit être une chaine de caractères
        required : true,    //Obligatoire
    }
}, { timestamps : true}); //Ajoute automatiquement les dates de créations et mises à jours



// HACHAGE DU MDP AVANT SAUVEGARDE
userSchema.pre('save', async function (next) {   // HOOK MONGOOSE -> Fonction qui s'execute avant de sauvegarder une utilisateur dans la BDD
    if (!this.isModified('password')) return next();  // this -> utilisateur qui va être enregistré  Cette ligne permet de ne pas re-hasher le mdp s'il n'a pas été modifé
    this.password = await bcrypt.hash(this.password, 10);  //On hash / chiffre le mdp avec un niveau de sécurité de 10
    next();  // passe à l'étape suivant comme un btn suivant dans un middleware
});


module.exports = mongoose.model('User', userSchema)