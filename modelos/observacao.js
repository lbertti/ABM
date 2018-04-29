var mongoose = require("mongoose");

//SCHEMA SETUP - criando o SCHEMA pro BD "abmtransporte"
var observacaoScheema = mongoose.Schema({
    abreviacao: String,
    texto: String,
});

module.exports = mongoose.model("Observacoes", observacaoScheema);