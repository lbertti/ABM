//TRANSPORTE ABM - TESTE DE USO DO DATABASE NO FIREBASE

/*
- Detalhamento de dados sobre uma determinada linha:
> Quando clicar em uma linha abre-se um div modal com os dados de observações e rotas relacionadas a linha clicada. 
> Os dados da linha tb devem ser apresentadas nessa DIV para que o usuário não fique perdido na navegação.
> Ao clicar no div modal ele se fechará
*/

var express = require("express"),
	app = express(),
  mongoose = require("mongoose"),
  carregaTudao = require("./cargaDados"),
  Rota = require("./modelos/rota.js"),
  Observacao = require("./modelos/observacao.js"),
  Linha = require("./modelos/linha.js");
  
mongoose.connect("mongodb://localhost/abmtransporte", function(err){
  if(err){
    console.log("MONGOOSE: erro ao executar o mongoose.connect(...) -------------------------------" + err);
  }
});

app.use(express.static("publico"));
app.set("view engine", "ejs");




app.get("/", function(req, res){
  console.log("ENTREI NA RAIZ DO SITE!");
  Linha.find( {}, function(err, linhas){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS LINHAS DO TRANSPORTE DA ABM. "  + err);
    } else {
      Rota.find( {}, function(err, rotas){
        if (err) {
          res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
        } else {
          res.render("index.ejs", {linhas: linhas, rotas: rotas});
        }
      }).sort({ via: 1});
    }
  }).sort({ ordem: 1, horario: 1, numero: 1});
});


app.get("/observacoes", function(req, res){
  console.log("ENTREI NA EXIBIÇÃO DE OBSERVAÇÕES!");
  Observacao.find( {}, function(err, observacoes){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS OBSERVACOES DO TRANSPORTE DA ABM. "  + err);
    } else {
      Rota.find( {}, function(err, rotas){
        if (err) {
          res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
        } else {
          res.render("observacoes.ejs", {observacoes: observacoes, rotas: rotas});
        }
      }).sort({ via: 1});
    }
  }).sort({ _id: 1, texto: 1});
});

app.get("/rotas", function(req, res){
  console.log("ENTREI NA EXIBIÇÃO DE ROTAS!");
  Rota.find( {}, function(err, rotas){
    if (err) {
      res.send("OCORREU UM ERRO AO TENTAR RECUPERAR AS ROTAS DO TRANSPORTE DA ABM. "  + err);
    } else {
      res.render("rotas.ejs", {rotas: rotas});
    }
  }).sort({ via: 1});
});




app.get("/cargacompleta", function(req, res){
  console.log("carga: !!!!!!!!!!!!!!!!!!!!!!!!!!!ENTREI NA CARGA COMPLETA DE DADOS!!!!!!!!!!!!!!!!!!!!!!!");
  carregaTudao();
  res.send("CARGA EXECUTADA!");
});

app.listen(8000, "127.0.0.1", function(){
  console.log("ABM *** SERVIÇO NO AR!!! ESCUTANDO EM 127.0.0.1:8000"); 
});





