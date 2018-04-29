var mongoose = require("mongoose");

//SCHEMA SETUP - criando o SCHEMA pro BD "abmtransporte"
var linhaSchema = new mongoose.Schema({
    numero: String,
    horario: String,
    origem: String,
    destino: String,
    via: String,
/*    rota: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rota" // collection que será relacionada a esse registro
    },
    observacoes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Observacao" // collection que será relacionada a esse registro
        }
    ], */
    observacoes: [],
    cor: String
});

//var Campground = mongoose.model("Campground", campgoundSchema);
module.exports = mongoose.model("Linha", linhaSchema);
