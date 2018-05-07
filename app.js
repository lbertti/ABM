//TRANSPORTE ABM - Mongo DB / Express / DOM Manipulation with jQuery / Bootstrap /

/*
- Detalhamento de dados sobre uma determinada linha:
> Quando clicar em uma linha abre-se um div modal com os dados de observações e rotas relacionadas a linha clicada. 
> Os dados da linha tb devem ser apresentadas nessa DIV para que o usuário não fique perdido na navegação.
> Ao clicar no div modal ele se fechará
*/
var Promise = require('promise');
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  carregaTudao = require("./cargaDados"),
  Rota = require("./modelos/rota.js"),
  Observacao = require("./modelos/observacao.js"),
  Linha = require("./modelos/linha.js");

//mongoose.connect("mongodb://localhost/abmtransporte", function(err){
mongoose.connect(process.env.DATABASEURL, function(err){ //usando a variável de ambiente
  if(err){
    console.log("MONGOOSE: erro ao executar o mongoose.connect(...) -------------------------------" + err);
  }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("publico"));
app.set("view engine", "ejs");

// var pre = {};

// var obterRotas = function () {

//   return new Promise(function(success, error) {
//     if(pre.rotas) {
//       success(pre.rotas);
//       return
//     }
//     Rota.find( {}, {sentido: 1, via:1}, function(err, rotas){
//         if (err) {
//           res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);

//           error(err)

//         } else {
//           pre.rotas = rotas;
//           success(rotas);
//         }
//       }).sort({ sentido:1, via: 1}); //recupera e ordena rotas para preencher o cabeçalho
//   })
// };


app.get("/", function(req, res){
  console.log("ENTREI NA RAIZ DO SITE!");
  Linha.find( {}, function(err, linhas){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS LINHAS DO TRANSPORTE DA ABM. "  + err);
    } else {

      // obterRotas().done(function (rotas) {
      //   res.render("index.ejs", {linhas: linhas, rotas: rotas, mostraTodasLinhas: true});
      // }).catch(function (reason) {
      //   res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. " + reason);
      // })





      Rota.find( {}, {sentido: 1, via:1}, function(err, rotas){
        if (err) {
          res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
        } else {
          res.render("index.ejs", {linhas: linhas, rotas: rotas, mostraTodasLinhas: true});
        }
      }).sort({ sentido:1, via: 1}); //recupera e ordena rotas para preencher o cabeçalho
    }
  }).sort({ ordem: 1, horario: 1, numero: 1});
});


app.get("/observacoes", function(req, res){
  console.log("ENTREI NA EXIBIÇÃO DE OBSERVAÇÕES!");
  Observacao.find( {}, function(err, observacoes){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS OBSERVACOES DO TRANSPORTE DA ABM. "  + err);
    } else {
      Rota.find( {}, {sentido:1, via:1}, function(err, rotas){
        if (err) {
          res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
        } else {
          res.render("observacoes.ejs", {observacoes: observacoes, rotas: rotas, mostraTodasLinhas: false});
        }
      }).sort({ sentido: 1, via: 1}); //recupera e ordena rotas para preencher o cabeçalho
    }
  }).sort({ _id: 1, texto: 1});
});

app.get("/rota/:idRota", function(req, res){
  var rotaDesejada = req.params.idRota;
  console.log("ENTREI NA EXIBIÇÃO DE ROTAS!");
  Rota.find( {}, {sentido:1, via:1}, function(err, rotas){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
    } else {
      Rota.findById(rotaDesejada, function(err, pontos){
        if (err) {
          res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
        } else {
          res.render("rotas.ejs", {rotas: rotas, pontos: pontos, mostraTodasLinhas: false});
        }
      });
    }
  }).sort({ sentido:1, via: 1}); //recupera e ordena rotas para preencher o cabeçalho
});

app.get("/sobre", function(req, res){
  console.log("ENTREI NA EXIBIÇÃO DO SOBRE!");
  Rota.find( {}, { sentido: 1, via:1}, function(err, rotas){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
    } else {
      res.render("sobre.ejs", {rotas: rotas, mostraTodasLinhas: false});
    }
  }).sort({ sentido: 1, via: 1}); //recupera e ordena rotas para preencher o cabeçalho
});


app.get("/cargacompleta", function(req, res){
  console.log("carga: !!!!!!!!!!!!!!!!!!!!!!!!!!!ENTREI NA CARGA COMPLETA DE DADOS!!!!!!!!!!!!!!!!!!!!!!!");
  carregaTudao();
  res.send("CARGA EXECUTADA!");
});

app.listen(8000, "127.0.0.1", function(){
//app.listen(process.env.PORT, process.env.IP, function(){
  console.log("ABM *** SERVIÇO NO AR!");
});





