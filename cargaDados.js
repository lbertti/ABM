var mongoose = require("mongoose");
var Rota = require("./modelos/rota.js");
var Observacao = require("./modelos/observacao.js");
var Linha = require("./modelos/linha.js");

//5: coleção com 5 ROTAS
var dadosRota = [
    { via: "Condomínios",
        paradas : [
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
    },
    { via: "Via Alto da Boa Vista",
        paradas: [ 
              "Av. Presidente Vargas, 418 - Previdência Social (pista central)",
              "Av. Presidente Vargas, 730 - Banco Central (pista central)", 
              "Av. Presidente Vargas, 4ª Delegacia- DPCA (pista central)", 
              "Av. Presidente Vargas, Central do Brasil - BRS4 (pista central)", 
              "Av. Presidente Vargas, Prefeitura, início da baia (pista central)",
              "Mariz e Barros, 300 - UFERJ",
              "Mariz e Barros,470 - Confeitaria Trigus",
              "Mariz e Barros, Hospital Gaffree Guinle, 824",
              "Almte. Cochrane,32 - Cultura Inglesa",
              "Almte. Cochrane, Largo Irmão Moises (Wall Mart)",
              "Almte. Cochrane, 214",
              "R. Conde de Bonfim, 426 - Ponto Frio",
              "R. Conde de Bonfim, 560 - Ed. Toronto",
              "R. Conde de Bonfim, 680 - Bco. Itaú",
              "R. Conde de Bonfim, 838 - em frente a Lighit",
              "R. Conde de Bonfim, 1116 - em frente Colégio São José",
              "R. Conde de Bonfim, 1331 (Herbert Richard)",
              "R. Edson Passos - Próximo ao Posto Nota 10",
              "R. Boa Vista - Corpo de Bombeiros",
              "Estrada de Furnas, 1.275(Comunidade do Maracaí)",
              "Itanhangá (próximo ao posto ipiranga)",
              "Itanhangá (em frente ao shopping itanhangá)",
              "Baia BRT/Metrô - próx. ao Condado de Cascais"
        ],
    },
    { via: "Via Jardim Botânico",
        paradas: [ 
              "Av. General Justo, 307 (CNC)", 
              "Rua México, 98", 
              "A. Presidente Wilson, 123 (Rest. Beduíno)",
              "Av. B. Mar, junto busto do Getúlio Vargas",
              "Praia do Flamengo, Antiga Manchete",
              "Praia do Flamengo, 66",
              "Praia do Flamengo, 200",
              "Osvaldo Cruz, 90",
              "Praia de Botafogo, 228 -C.Empresarial(Ed.Arg)",
              "Praia de Botafogo, 356 (Ed. Solimar)",
              "Rua S. Clemente, 38 - Ed. CAPEMISA",
              "Rua S. Clemente, 250",
              "Rua S. Clemente, 398 - Ed. P. de Mônaco",
              "Humaitá, 68 A - ao lado do Colégio Pedro II",
              "Humaitá, 244 - Próx. Aos Correios(Ag. Grande)",
              "R. Jardim Botânico, 67 (embaixo do viaduto)",
              "Jardim Botânico, 266 - TV Globo",
              "Jardim Botânico, 518 (Ed. Raul Fortunato)",
              "Jardim Botânico, 720 - (Drogaria Max)",
              "Jardim Botânico, EMBRAPA",
              "Praça Santos Dumont (inicio da Praça)",
              "R. Rodrigo Otavio, 389",
              "Av. Padre Leonel Franca, 150",
              "São Conrado - Motel Escort",
              "Passarela Lgo. de S. Conrado",
              "Lgo. da Barra - Igreja S. Francisco",
              "Baia BRT/Metrô - próx. ao Condado de Cascais"
        ],
    },
    { via: "Via Copacabana",
        paradas: [
              "Av. General Justo, 307 (CNC)", 
              "Rua México, 98", 
              "A. Presidente Wilson, 123 (Rest. Beduíno)",
              "Av. B. Mar, junto busto do Getúlio Vargas",
              "Praia do Flamengo, Antiga Manchete",
              "Praia do Flamengo, 66",
              "Praia do Flamengo, 200",
              "Osvaldo Cruz, 90",
              "Av.Nações Unidas,228 -C.Empresarial(Ed.Arg)",
              "Av. Nações Unidas, 356 (Ed. Solimar)",
              "Av. Nações Unidas Botafogo - Mourisco",
              "Av.Lauro Sodré/Casa Gourmet Shopping",
              "Av. Princesa Isabel, 181",
              "Av. Princesa Isabel,323 - Correios",
              "Praça do Lido, posto 2",
              "Av. Atlântica,1782 - AMSTERDAN",
              "Av. Atlântica,2230 - H. Olinda Rio Othon",
              "Av. Atlântica,2600 - H. JW Marriott",
              "Av. Atlântica,3264 - H. Rio Othon Palace",
              "Av. Atlântica,3880 - Restaurante Chinês",
              "Av. Rai.Elizabeth,416 - Próx. B. Carvalho",
              "Av. Vieira Souto,176 - Casa Cult. Laura Alvim",
              "Av. Vieira Souto,320 - H. Sol de Ipanema",
              "Av. Vieira Souto,460 - H. Sofitel",
              "Av. Vieira Souto,594 próx. Anibal de Mendonça",
              "Av. Vieira Souto,706 - H. Praia de Ipanema",
              "Av. Delfim Moreira,192 (Posto 11)",
              "Av. Delfim Moreira,632 - Marina Palace Hotel",
              "Rua Bartolomeu Mitre,438A, Banco do Brasil",
              "Rua B. Mitre, em frente ao 23º Batalhão PM",
              "Av. Padre Leonel Franca, 150",
              "São Conrado - Motel Escort",
              "Passarela Lgo. de S. Conrado",
              "Lgo. da Barra - Igreja S. Francisco",
              "Baia BRT/Metrô - próx. ao Condado de Cascais"
        ],
    },
    { via: "Via Copacabana *(até 09:30)",
        paradas: [ 
              "Av. General Justo, 307 (CNC)", 
              "Rua México, 98", 
              "A. Presidente Wilson, 123 (Rest. Beduíno)",
              "Av. B. Mar, junto busto do Getúlio Vargas",
              "Praia do Flamengo, Antiga Manchete",
              "Praia do Flamengo, 66",
              "Praia do Flamengo, 200",
              "Osvaldo Cruz, 90",
              "Av.Nações Unidas,228 -C.Empresarial(Ed.Arg)",
              "Av. Nações Unidas, 356 (Ed. Solimar)",
              "Av. Nações Unidas Botafogo - Mourisco",
              "Av.Lauro Sodré/Casa Gourmet Shopping",
              "*Rua B. Ribeiro,222 -Copa Hotel Residência",
              "*Rua B. Ribeiro,468 - Gal. Menescal",
              "*Av. Raul Pompéia,149-Próx.R.Elizabeth",
              "*Prud. de Morais, 302 prédio Tiffany",
              "*Prud. de Morais, 614 próx. V. Morais",
              "*Prud. de Morais, 1132 Hotel Everest",
              "*Prud. de Morais, 1810 Prox. Rest. Ten-kai",
              "*Av. Gen. San Martin, 156 próx.Metrô",
              "Av. Princesa Isabel, 181",
              "Av. Princesa Isabel,323 - Correios",
              "Praça do Lido, posto 2",
              "Av. Atlântica,1782 - AMSTERDAN",
              "Av. Atlântica,2230 - H. Olinda Rio Othon",
              "Av. Atlântica,2600 - H. JW Marriott",
              "Av. Atlântica,3264 - H. Rio Othon Palace",
              "Av. Atlântica,3880 - Restaurante Chinês",
              "Av. Rai.Elizabeth,416 - Próx. B. Carvalho",
              "Av. Vieira Souto,176 - Casa Cult. Laura Alvim",
              "Av. Vieira Souto,320 - H. Sol de Ipanema",
              "Av. Vieira Souto,460 - H. Sofitel",
              "Av. Vieira Souto,594 próx. Anibal de Mendonça",
              "Av. Vieira Souto,706 - H. Praia de Ipanema",
              "Av. Delfim Moreira,192 (Posto 11)",
              "Av. Delfim Moreira,632 - Marina Palace Hotel",
              "Rua Bartolomeu Mitre,438A, Banco do Brasil",
              "Rua B. Mitre, em frente ao 23º Batalhão PM",
              "Av. Padre Leonel Franca, 150",
              "São Conrado - Motel Escort",
              "Passarela Lgo. de S. Conrado",
              "Lgo. da Barra - Igreja S. Francisco",
              "Baia BRT/Metrô - próx. ao Condado de Cascais"
        ]
    }
];

//23: coleção com 23 OBSERVACOES
var dadosObservacao = [
    {   abreviacao: "A",    texto: "Atende Aeroporto Santos Dumont"},
    {   abreviacao: "ABM",  texto: "Saída da Sede da ABM"},
    {   abreviacao: "C",    texto: "Ponto passarela do Metrô de Sâo Cristovão, Av. Radial Oeste"},
    {   abreviacao: "D",    texto: "Direto 1ª parada no Rio Sul"},
    {   abreviacao: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"},
    {   abreviacao: "F",    texto: "Atenderá o Largo da Barra (2ª à 6ª)"},
    {   abreviacao: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduino,Av. Pres Wilson"},
    {   abreviacao: "I",    texto: "Somente aos sábados e feriados. Atende ao Lgo. da Barra"},
    {   abreviacao: "J",    texto: "Haddock Lôbo - Prof. Gabizo - Gal. Canabarro, Mata Machado e Av. Maracanã"},
    {   abreviacao: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"},
    {   abreviacao: "K",    texto: "Rua São Clemente e Nelson Mandela (Embarque próximo ao metrô entre as ruas: Nelson Mandela e Vol. Da Pátria) e n° 45 da Vol. da Pátria (Ed. Barão do Rio Bonito)"},
    {   abreviacao: "L",    texto: "Atende à Rua Jornalista Guima."},
    {   abreviacao: "M",    texto: "Faz retorno no Supermercado Extra"},
    {   abreviacao: "N",    texto: "Saída da rua Mariz Barros, 273"},
    {   abreviacao: "O",    texto: "Via Praia de Botafogo pista interna"},
    {   abreviacao: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"},
    {   abreviacao: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},
    {   abreviacao: "T" ,   texto: "Saída Av. Américas em frente às Torres"},
    {   abreviacao: "Y",    texto: "Somente funciona de Segunda à Sexta"},
    {   abreviacao: "U",    texto: "(2ª à 6ª) BarraShopping, Mergulhão"},
    {   abreviacao: "V",    texto: "Ponto inicial Rua México, 98"},
    {   abreviacao: "X",    texto: "Ponto inicial na Av Beira Mar junto ao Busto Getúlio Vargas."},
    {   abreviacao: "Z",    texto: "Ponto final na Rua México, 98"}
];

//133: coleção com 70 LINHAS da VERDE, 66 LINHAS da VERMELHA e xx da AMARELA
var dadosLinha = [
    {numero: 6, horario:  "06:10", origem: "Barra", destino: "Metrô Tij.", via: "Alto B. Vista", observacoes: [ "GC", "L" ], cor: "verde"},
    {numero: 4, horario:  "05:50", origem: "Barra", destino: "Tij.Circ/UERJ", via: "Alto B.Vista/UERJ", observacoes: [ "GC" ], cor: "verde"},
    {numero: 13, horario:  "06:40", origem: "Barra", destino: "Tij.Circ/UERJ", via: "Alto B. Vista ", observacoes: [ "GC", "L" ], cor: "verde"},
    {numero: 1,  horario: "05:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC", "J"], cor: "verde"},
    {numero: 2,  horario: "05:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["ABM"], cor: "verde"},
    {numero: 3,  horario: "05:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 5,  horario: "06:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 7,  horario: "06:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 8,  horario: "06:15", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 9,  horario: "06:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 10,  horario: "06:30", origem: "Barra", destino: "Centro", via: "DIRETO-COPA ", observacoes: ["GC", "D"], cor: "verde"},
    {numero: 11,  horario: "06:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["PTB"], cor: "verde"},
    {numero: 12,  horario: "06:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 14,  horario: "06:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 15,  horario: "06:50", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 16,  horario: "07:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["ABM", "E"], cor: "verde"},
    {numero: 17,  horario: "07:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["PTB"], cor: "verde"},
    {numero: 18,  horario: "07:10", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 19,  horario: "07:15", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 20,  horario: "07:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["ABM", "E"], cor: "verde"},
    {numero: 21,  horario: "07:20", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 22,  horario: "07:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 23,  horario: "07:35", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["PTB"], cor: "verde"},
    {numero: 2,  horario: "07:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 5,  horario: "07:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 6,  horario: "08:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 7,  horario: "08:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["PTB", "E"], cor: "verde"},
    {numero: 1,  horario: "08:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 3,  horario: "08:10", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["ABM", "E"], cor: "verde"},
    {numero: 8,  horario: "08:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 10,  horario: "08:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 9,  horario: "08:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 14,  horario: "08:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 12,  horario: "08:45", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["PTB", "E"], cor: "verde"},
    {numero: 11,  horario: "08:55", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 13,  horario: "09:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "E"], cor: "verde"},
    {numero: 15,  horario: "09:10", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 16,  horario: "09:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 17,  horario: "09:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 18,  horario: "09:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 20,  horario: "09:45", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["PTB"], cor: "verde"},
    {numero: 19,  horario: "10:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 21,  horario: "10:15", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 22,  horario: "10:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 23,  horario: "10:45", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 6,  horario: "11:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC", "A"], cor: "verde"},
    {numero: 8,  horario: "11:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 9,  horario: "12:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["GC"], cor: "verde"},
    {numero: 10,  horario: "12:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 7,  horario: "13:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 5,  horario: "13:30", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes: ["GC", "A"], cor: "verde"},
    {numero: 11,  horario: "13:45", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 2,  horario: "14:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 3,  horario: "14:40", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["GC"], cor: "verde"},
    {numero: 12,  horario: "15:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["T"], cor: "verde"},
    {numero: 13,  horario: "15:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["GC"], cor: "verde"},
    {numero: 10,  horario: "16:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes: ["GC", "A", "Z"], cor: "verde"},
    {numero: 14,  horario: "16:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 15,  horario: "16:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["T", "Z"], cor: "verde"},
    {numero: 16,  horario: "16:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 17,  horario: "17:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 18,  horario: "17:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes: ["T", "A", "Z"], cor: "verde"},
    {numero: 19,  horario: "17:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 20,  horario: "17:30", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes: ["T", "A", "Z"], cor: "verde"},
    {numero: 21,  horario: "18:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 9,  horario: "18:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes: ["T", "A", "Z"], cor: "verde"},
    {numero: 11,  horario: "18:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes: ["T", "Z"], cor: "verde"},
    {numero: 12,  horario: "19:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["T", "Z"], cor: "verde"},
    {numero: 22,  horario: "19:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes: ["T"], cor: "verde"},
    {numero: 23,  horario: "20:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes: ["T", "Z"], cor: "verde"},


    {numero: 1, horario: "06:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 2, horario: "06:30", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes: ["M"], cor: "vermelho"},
    {numero: 3, horario: "06:50", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M"], cor: "vermelho"},
    {numero: 4, horario: "Circ. ", origem: "Circ./Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["M"], cor: "vermelho"},
    {numero: 6, horario: "Circ. ", origem: "Metrô Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["M"], cor: "vermelho"},
    {numero: 5, horario: "06:50", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes: ["M"], cor: "vermelho"},
    {numero: 11, horario: "07:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR", "M"], cor: "vermelho"},
    {numero: 14, horario: "07:40", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes: ["M"], cor: "vermelho"},
    {numero: 13, horario: "Circ. ", origem: "Circ/Tijuca ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["M"], cor: "vermelho"},
    {numero: 15, horario: "07:50", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["H"], cor: "vermelho"},
    {numero: 18, horario: "08:20", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["H"], cor: "vermelho"},
    {numero: 17, horario: "08:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 20, horario: "08:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["H"], cor: "vermelho"},
    {numero: 19, horario: "08:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 21, horario: "09:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["H"], cor: "vermelho"},
    {numero: 22, horario: "09:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 23, horario: "09:15", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["H"], cor: "vermelho"},
    {numero: 6, horario: "09:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 7, horario: "09:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 3, horario: "09:40", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho"},
    {numero: 1, horario: "09:45", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 2, horario: "10:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 5, horario: "10:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 8, horario: "10:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho"},
    {numero: 9, horario: "10:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 10, horario: "11:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho"},
    {numero: 11, horario: "12:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 12, horario: "12:10", origem: "Metrô Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["L"], cor: "vermelho"},
    {numero: 13, horario: "12:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho"},
    {numero: 17, horario: "12:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR", "L"], cor: "vermelho"},
    {numero: 14, horario: "13:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho"},
    {numero: 15, horario: "14:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho"},
    {numero: 10, horario: "14:15", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR"], cor: "vermelho"},
    {numero: 16, horario: "14:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M"], cor: "vermelho"},
    {numero: 18, horario: "15:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 19, horario: "15:15", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR", "M "], cor: "vermelho"},
    {numero: 20, horario: "15:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 6, horario: "16:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 21, horario: "16:10", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 8, horario: "16:15", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 9, horario: "16:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 11, horario: "16:50", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 5, horario: "17:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 2, horario: "17:10", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 7, horario: "17:10", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 12, horario: "17:20", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 3, horario: "17:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 23, horario: "17:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 22, horario: "17:40", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 13, horario: "18:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 14, horario: "18:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 10, horario: "18:10", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 15, horario: "18:15", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 16, horario: "18:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 18, horario: "18:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 6, horario: "18:40", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 17, horario: "18:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 20, horario: "19:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["O","M","V"], cor: "vermelho"},
    {numero: 8, horario: "19:20", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["M","V"], cor: "vermelho"},
    {numero: 19, horario: "19:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 9, horario: "19:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["O","M","V"], cor: "vermelho"},
    {numero: 11, horario: "20:10", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["O","M","V"], cor: "vermelho"},
    {numero: 21, horario: "20:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes: ["O","M","V"], cor: "vermelho"},
    {numero: 12, horario: "20:45", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes: ["SR","M"], cor: "vermelho"},
    {numero: 22, horario: "21:10", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes: ["O","K","M"], cor: "vermelho"},
    {numero: 23, horario: "22:00", origem: "Centro ", destino: "Barra", via: "UERJ/Copa ", observacoes: ["O","K","C"], cor: "vermelho"}

];

function carregaTudo(){
    console.log("1) Entrou no CARREGATUDO()");
    //    zera o BD - REMOVE DADOS DAS TABELAS DE ROTAS, OBSERVAÇÕES E LINHAS
    Rota.remove({}, function(err){
        if(err){
            console.log("Erro ao executar a exclusão das ROTAS ----------------- " + err);
        } else {
            Observacao.remove({}, function(err){
                if(err){
                    console.log("Erro ao executar a exclusão das OBSERVAÇÕES ----------------- " + err);
                } else {
                    Linha.remove({}, function(err){
                        if(err){
                            console.log("Erro ao executar a exclusão das LINHAS ----------------- " + err);
                        } else {

                            //ACABEI DE REMOVER TUDO!, AGORA VOU POPULAR TUDO DE NOVO!
                            console.log("2) TERMINOU a REMOÇÃO DE DADOS DO BD");
                            //popula dados de Observação
                            dadosObservacao.forEach(function(dado){
                                Observacao.create(dado, function(err, observacao){
                                    if(err){
                                        console.log("Erro ao incluir uma OBSERVACAO --------------------------" + observacao.abreviacao + "  --------------------------" + err);
                                    } else {
                                        observacao.save();
                                        console.log("Observação adicionada: " + dado.abreviacao);
                                    }
                                });
                                console.log("3) TERMINOU A INCLUSÃO DAS OBSERVAÇÕES");
                            });
                        
                            //popula dados de Rotas
                            dadosRota.forEach(function(dado){
                                Rota.create(dado, function(err, rota){
                                    if(err){
                                        console.log("Erro ao incluir uma ROTA --------------------------" + rota.via + "  --------------------------" + err);
                                    } else {
                                        rota.save();
                                        console.log("Rota adicionada: " + dado.via);
                                    }
                                });
                                console.log("4) TERMINOU A INCLUSÃO DAS ROTAS");
                            });
                        
                            //popula dados de linha
                            dadosLinha.forEach(function(dado){
                                Linha.create(dado, function(err, linha){
                                    if(err){
                                        console.log("Erro ao incluir uma LINHA --------------------------" + dado.numero + " - " + dado.horario + " - " + dado.origem + " - " + dado.destino + " - " + dado.via + "  --------------------------" + err);
                                    } else {
                                        linha.save();
                                        console.log("Observação adicionada: " + dado.numero + " - " + dado.horario + " - " + dado.origem + " - " + dado.destino + " - " + dado.via);
                                    }
                                });
                                console.log("5) TERMINOU A INCLUSÃO DAS LINHAS");
                            });
                        


                        }
                    });
                }
                
            });
        }
    });

};

module.exports = carregaTudo;
