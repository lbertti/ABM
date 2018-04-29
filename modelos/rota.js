var mongoose = require("mongoose");

//SCHEMA SETUP - criando o SCHEMA pro BD "abmtransporte"
var rotaScheema = mongoose.Schema({
    via: String,
    paradas: []
});

module.exports = mongoose.model("Rota", rotaScheema);





/*
"Pontos" : { 
    "Condomínios" : [
      "Golden Center, 2111",
      "Unimed",
      "Cond.Saint Tropez",
      "Cond. Portal B. (fundos)",
      "Cond. Costabella",
      "Cond. Via Cancun",
      "Cond. Spazio",
      "Sede da ABM",
      "Av. Afonso Arinos (esq. H. Cordeiro)"
    ],

    */