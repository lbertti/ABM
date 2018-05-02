var mongoose = require("mongoose");

//SCHEMA SETUP - criando o SCHEMA pro BD "abmtransporte"
var linhaSchema = new mongoose.Schema({
    numero: Number,
    horario: String,
    origem: String,
    destino: String,
    via: String,
    // rota: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Rota" // collection que será relacionada a esse registro
    // },
    observacoes: [
        {
            _id: String,
            texto: String
        }
    ], 
    // observacoes: [],
    cor: String,
    ordem: Number
});

//var Campground = mongoose.model("Campground", campgoundSchema);
module.exports = mongoose.model("Linha", linhaSchema);
