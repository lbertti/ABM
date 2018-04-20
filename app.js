var express = require("express"),
	app = express(),
	admin = require("firebase-admin"),
	rota = express.Router();

/*FIREBASE CODE*/
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://berttibrazil.firebaseio.com"
});
/*FIM DO FIREBASE CODE*/

rota.get("/", function(req, res){
	console.log("entrou na raiz do ABM TRANSPORTE");
});

app.listen(8000, "127.0.0.1", function(){
	console.log("O APP DA ABM TRANSPORTE ESTÁ RODANDO! SIMBORA!");
});