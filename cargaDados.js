var mongoose = require("mongoose");
var Rota = require("./modelos/rota.js");
var Observacao = require("./modelos/observacao.js");
var Linha = require("./modelos/linha.js");

//5: coleção com 5 ROTAS
var dadosRota = [
    { via: "Condomínios",
        sentido: "TODOS",
        paradas : [
                "Golden Center, 2111 (exceto ABM e PTB)",
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
        sentido: "BARRA",
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
        sentido: "BARRA",
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
        sentido: "BARRA",
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
        sentido: "BARRA",
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
    },
    { via: "Metrô Tijuca - Barra",
        sentido: "BARRA",
        paradas: [ 
            "Cde. Bonfim, N° 426 - Ponto Frio",
            "Cde. Bonfim,560 - Ed. Toronto",
            "Cde. Bonfim,680 - Bco. Itaú",
            "R. Cde. Bonfim, 838",
            "R. Cde. Bonfim,1116 - em frente Colégio São José",
            "R. Conde de Bonfim, 1131 (Herbert Richard)",
            "R. Edson Passos - Próximo Posto Nota 10",
            "R. Boa Vista - Corpo de Bombeiros",
            "Estrada de Furnas, 1275(Comunidade do Maracaí)",
            "Itanhangá (próximo ao posto ipiranga)",
            "Itanhangá (em frente ao shopping itanhangá)",
            "Baia BRT/Metrô - próx. ao Condado de Cascais"
        ]
    },
    { via: "Via J.Botânico e Botafogo",
        sentido: "CENTRO",
        paradas: [ 
            "Rua Tubiara - Auto Pintura Apollo S/N",
            "Pr. Santos Dumont (Jockey)",
            "Jardim Botânico, Embrapa",
            "R. Jard. Botânico, 667 - Cultura Inglesa",
            "R. Jard. Botânico, 518 - Próx. Hospital da Lagoa",
            "R. Jard. Botânico,295 - Próx. ao Clube Militar",
            "R. Jardim Botânico,67 ( Ed. Houdini )",
            "R. Humaitá, 135 em frente ao Banco Itaú",
            "R. Vol. da Pátria,435 - Cobal",
            "R. Vol. da Pátria,305 - Pão de Açucar",
            "R. Vol. da Pátria, KFC - Restaurante",
            "R. Vol. da Pátria 45 - próx.ao Metro/Bot. Ed.B. Rio Bonito",
            "Praia de Botafogo, 356 (Ed. Solimar)",
            "Praia de Botafogo, 228 -C.Empresarial(Ed.Arg)",
            "Praia de Botafogo, 68 (em frente Edi. Vifer)",
            "R. Ruy Barbosa, 280 próx. antiga Sede Flamengo",
            "Praia do Flamengo, 200",
            "Praia do Flamengo, 66",
            "Praia do Flamengo, 834 Antigo Edf. Manchete",
            "R. México, 98",
            "Av. Mal. Aguinaldo C. de Castro(lateral do Fórum )",
            "Av. General Justo, 307"
        ]
    },
    { via: "Via Tijuca - Rua Conde de Bonfim",
        sentido: "CENTRO",
        paradas: [ 
            "Itanhangá, 1636 (em frente Shopp. Itanhangá) ",
            "Itanhangá (próximo ao posto ipiranga) ",
            "Estrada de Furnas, 3001 ",
            "Estrada de Furnas,1440 (Comun. do Maracaí) ",
            "R. Edson Passos , 15 Loja C ",
            "R. Cde. de Bonfim,1131 (Antigo Herbert Richard) ",
            "R. Cde. Bonfim,1065 - ao lado do Col. São José ",
            "R. Cde. Bonfim, 838 Bara Auto Peça (Light) ",
            "R. Cde. Bonfim,579 - Ed. Claudia ",
            "R. Cde. Bonfim,391 - Zinzane ",
            "Conde de Bonfim, 255 (Medical Center) ",
            "Conde de Bonfim, 199 (Hortifruti) ",
            "Conde de Bonfim, 83 (Ed. Maison Daniselle) ",
            "Conde de Bonfim, 25 - Ed. Lord ",
            "Prof. Gabizo, Esq. com Satamini ",
            "Rua Silva Ramos, 119 ",
            "Rua Gonçalves Crespo - Ant. Clube do América ",
            "Praça da Bandeira,179 Lojas Americanas ",
            "Av. Pres. Vargas Prefeitura (baia) ",
            "Av. Pres. Vargas C. do Brasil (Cent. de Imagem) ",
            "Av. Pres. Vargas Biblioteca Estadual ",
            "Av. Pres. Vargas, 1001 ",
            "Av. Pres. Vargas, em frente ao nº 529 "
        ]
    },
    { via: "Barra",
        sentido: "CIRCULAR",
        paradas: [ 
            'Condomínios',
            'DownTown',
            'Conviva',
            'Extra',
            'Caixa Econômica',
            'Pão de Açucar Freeway',
            'Shopping Bayside',
            'Centro Empr. Mario Henrique Simonsen (nos dois sentidos)',
            'em frete ao antigo WalMart',
            'Centro Empr. Barrashopping (Estácio)',
            'Barrashopping Américas (em frente ao TOTEN Barrashopping)',
            'Leroy Merlim',
            'Prédio da VIVO n° 2.200',
            'Via Parque',
            'Estácio Campus Terra Encantada',
            'BarraShopping (Nível Lagoa)',
            'Esplanada da Barra',
            'Barra Square',
            'Barra Garden',
            'Riviera',
            'Mac Donald\'s',
            'Golden Center',
            'Armando Lombardi, Metrô J. Oceânico',
            'Parmê',
            'Ig. S. Fco. de Paula',
            'P. dos Amores, (em frente à Cabina do Bombeiro)',
            'Passarela da Barra',
            'Baia BRT/Metrô - Próximo ao Condado de Cascais'
        ]
    }
];

//23: coleção com 23 OBSERVACOES
var dadosObservacao = [
    {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"},
    {   _id: "ABM",  texto: "Saída da Sede da ABM"},
    {   _id: "C",    texto: "Ponto passarela do Metrô de Sâo Cristovão, Av. Radial Oeste"},
    {   _id: "D",    texto: "Direto. 1ª parada no Rio Sul"},
    {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"},
    {   _id: "F",    texto: "Atenderá o Largo da Barra (2ª à 6ª)"},
    {   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"},
    {   _id: "I",    texto: "Somente aos sábados e feriados. Atende ao Lgo. da Barra"},
    {   _id: "J",    texto: "Haddock Lôbo - Prof. Gabizo - Gal. Canabarro, Mata Machado e Av. Maracanã"},
    {   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"},
    {   _id: "K",    texto: "Rua São Clemente e Nelson Mandela (Embarque próximo ao metrô entre as ruas: Nelson Mandela e Vol. Da Pátria) e n° 45 da Vol. da Pátria (Ed. Barão do Rio Bonito)"},
    {   _id: "L",    texto: "Atende à Rua Jornalista Guima."},
    {   _id: "M",    texto: "Faz retorno no Supermercado Extra"},
    {   _id: "N",    texto: "Saída da rua Mariz Barros, 273"},
    {   _id: "O",    texto: "Via Praia de Botafogo pista interna"},
    {   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"},
    {   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},
    {   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"},
    {   _id: "Y",    texto: "Somente funciona de Segunda à Sexta"},
    {   _id: "U",    texto: "(2ª à 6ª) BarraShopping, Mergulhão"},
    {   _id: "V",    texto: "Ponto inicial Rua México, 98"},
    {   _id: "X",    texto: "Ponto inicial na Av Beira Mar junto ao Busto Getúlio Vargas."},
    {   _id: "Z",    texto: "Ponto final na Rua México, 98"}
];

//133+34= 167 : coleção com 70 LINHAS da VERDE, 66 LINHAS da VERMELHA, 6 LINHAS CENTRO/BARRA NO SABADO e 28 da AMARELA
//a propriedade COR: das linhas de ônibus representam a classe CSS tratada pela app
var dadosLinha = [
    {numero: 6, horario:  "06:10", origem: "Barra", destino: "Metrô Tij.", via: "Alto B. Vista", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "L",    texto: "Atende à Rua Jornalista Guima."} ], cor: "verde", ordem: 10},
    {numero: 4, horario:  "05:50", origem: "Barra", destino: "Tij.Circ/UERJ", via: "Alto B.Vista/UERJ", observacoes: [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"} ], cor: "verde", ordem: 10},
    {numero: 13, horario:  "06:40", origem: "Barra", destino: "Tij.Circ/UERJ", via: "Alto B. Vista ", observacoes:  [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "L",    texto: "Atende à Rua Jornalista Guima."} ], cor: "verde", ordem: 10},
    {numero: 1,  horario: "05:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:      [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "J",    texto: "Haddock Lôbo - Prof. Gabizo - Gal. Canabarro, Mata Machado e Av. Maracanã"}], cor: "verde", ordem: 10},
    {numero: 2,  horario: "05:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "ABM",  texto: "Saída da Sede da ABM"}], cor: "verde", ordem: 10},
    {numero: 3,  horario: "05:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 5,  horario: "06:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 7,  horario: "06:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 8,  horario: "06:15", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 9,  horario: "06:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:      [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 10,  horario: "06:30", origem: "Barra", destino: "Centro", via: "DIRETO-COPA ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "D",    texto: "Direto. 1ª parada no Rio Sul"}], cor: "verde", ordem: 10},
    {numero: 11,  horario: "06:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}], cor: "verde", ordem: 10},
    {numero: 12,  horario: "06:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 14,  horario: "06:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 15,  horario: "06:50", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 16,  horario: "07:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "ABM",  texto: "Saída da Sede da ABM"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 17,  horario: "07:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}], cor: "verde", ordem: 10},
    {numero: 18,  horario: "07:10", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 19,  horario: "07:15", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 20,  horario: "07:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "ABM",  texto: "Saída da Sede da ABM"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 21,  horario: "07:20", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 22,  horario: "07:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 23,  horario: "07:35", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}], cor: "verde", ordem: 10},
    {numero: 2,  horario: "07:40", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 5,  horario: "07:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 6,  horario: "08:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:      [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 7,  horario: "08:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 1,  horario: "08:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 3,  horario: "08:10", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "ABM",  texto: "Saída da Sede da ABM"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 8,  horario: "08:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 10,  horario: "08:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 9,  horario: "08:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 14,  horario: "08:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 12,  horario: "08:45", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 11,  horario: "08:55", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 13,  horario: "09:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "E",    texto: "Expre/Cent. 1ª parada a partir da passarela de São Conrado. Não faz parada no Metrô Barra"}], cor: "verde", ordem: 10},
    {numero: 15,  horario: "09:10", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 16,  horario: "09:20", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 17,  horario: "09:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 18,  horario: "09:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 20,  horario: "09:45", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "PTB",  texto: "Saída do Portal da Barra Av. das Americas , 411"}], cor: "verde", ordem: 10},
    {numero: 19,  horario: "10:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 21,  horario: "10:15", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 22,  horario: "10:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 23,  horario: "10:45", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 6,  horario: "11:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}], cor: "verde", ordem: 10},
    {numero: 8,  horario: "11:50", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 9,  horario: "12:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 10,  horario: "12:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 7,  horario: "13:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 5,  horario: "13:30", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes:   [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}], cor: "verde", ordem: 10},
    {numero: 11,  horario: "13:45", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 2,  horario: "14:00", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 3,  horario: "14:40", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:      [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 12,  horario: "15:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 13,  horario: "15:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verde", ordem: 10},
    {numero: 10,  horario: "16:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes:  [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 14,  horario: "16:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 15,  horario: "16:10", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 16,  horario: "16:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 17,  horario: "17:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 18,  horario: "17:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes:  [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 19,  horario: "17:30", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 20,  horario: "17:30", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes:  [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 21,  horario: "18:00", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 9,  horario: "18:00", origem: "Barra", destino: "Centro", via: "Copa-Niem-Aterro ", observacoes:   [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "A",    texto: "Atende Aeroporto Santos Dumont"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 11,  horario: "18:30", origem: "Barra", destino: "Centro", via: "J. Botânico ", observacoes:       [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 12,  horario: "19:00", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},
    {numero: 22,  horario: "19:20", origem: "Barra", destino: "Centro", via: "Alto B. Vista ", observacoes:     [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}], cor: "verde", ordem: 10},
    {numero: 23,  horario: "20:30", origem: "Barra", destino: "Centro", via: "Copa - Niem ", observacoes:       [{   _id: "T" ,   texto: "Saída Av. Américas em frente às Torres"}, {   _id: "Z",    texto: "Ponto final na Rua México, 98"}], cor: "verde", ordem: 10},


    {numero: 1, horario: "06:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:      [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 2, horario: "06:30", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 3, horario: "06:50", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 4, horario: "Circ. ", origem: "Circ./Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 6, horario: "Circ. ", origem: "Metrô Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 5, horario: "06:50", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 11, horario: "07:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}, {   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 14, horario: "07:40", origem: "Centro ", destino: "Barra", via: "Copa/Aterro ", observacoes:       [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 13, horario: "Circ. ", origem: "Circ/Tijuca ", destino: "Barra", via: "Alto B. Vista ", observacoes: [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 15, horario: "07:50", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"}], cor: "vermelho", ordem: 20},
    {numero: 18, horario: "08:20", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"}], cor: "vermelho", ordem: 20},
    {numero: 17, horario: "08:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 20, horario: "08:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"}], cor: "vermelho", ordem: 20},
    {numero: 19, horario: "08:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 21, horario: "09:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"}], cor: "vermelho", ordem: 20},
    {numero: 22, horario: "09:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 23, horario: "09:15", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "H",    texto: "Não atende o Ponto da México - Embarque Rest. Beduíno, Av. Pres Wilson"}], cor: "vermelho", ordem: 20},
    {numero: 6, horario: "09:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:      [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 7, horario: "09:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 3, horario: "09:40", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho", ordem: 20},
    {numero: 1, horario: "09:45", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 2, horario: "10:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:      [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 5, horario: "10:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 8, horario: "10:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho", ordem: 20},
    {numero: 9, horario: "10:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 10, horario: "11:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho", ordem: 20},
    {numero: 11, horario: "12:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 12, horario: "12:10", origem: "Metrô Tij. ", destino: "Barra", via: "Alto B. Vista ", observacoes: [{   _id: "L",    texto: "Atende à Rua Jornalista Guima."}], cor: "vermelho", ordem: 20},
    {numero: 13, horario: "12:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho", ordem: 20},
    {numero: 17, horario: "12:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}, {   _id: "L",    texto: "Atende à Rua Jornalista Guima."}], cor: "vermelho", ordem: 20},
    {numero: 14, horario: "13:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", cor: "vermelho", ordem: 20},
    {numero: 15, horario: "14:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", cor: "vermelho", ordem: 20},
    {numero: 10, horario: "14:15", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}], cor: "vermelho", ordem: 20},
    {numero: 16, horario: "14:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 18, horario: "15:00", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 19, horario: "15:15", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"}, {   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 20, horario: "15:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 6, horario: "16:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:         [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 21, horario: "16:10", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 8, horario: "16:15", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 9, horario: "16:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:         [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 11, horario: "16:50", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 5, horario: "17:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:         [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 2, horario: "17:10", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 7, horario: "17:10", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:      [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 12, horario: "17:20", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 3, horario: "17:30", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:      [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 23, horario: "17:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 22, horario: "17:40", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 13, horario: "18:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 14, horario: "18:00", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 10, horario: "18:10", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 15, horario: "18:15", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 16, horario: "18:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 18, horario: "18:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 6, horario: "18:40", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 17, horario: "18:40", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 20, horario: "19:00", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 8, horario: "19:20", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:        [{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 19, horario: "19:20", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 9, horario: "19:30", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:         [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 11, horario: "20:10", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 21, horario: "20:30", origem: "Centro ", destino: "Barra", via: "J. Botânico ", observacoes:       [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"},{   _id: "V",    texto: "Ponto inicial Rua México, 98"}], cor: "vermelho", ordem: 20},
    {numero: 12, horario: "20:45", origem: "Centro ", destino: "Barra", via: "Alto B. Vista ", observacoes:     [{   _id: "SR",   texto: "Av. Presidente Vargas, 418 INSS (pista central)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 22, horario: "21:10", origem: "Centro ", destino: "Barra", via: "Copacabana ", observacoes:        [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "K",    texto: "Rua São Clemente e Nelson Mandela (Embarque próximo ao metrô entre as ruas: Nelson Mandela e Vol. Da Pátria) e n° 45 da Vol. da Pátria (Ed. Barão do Rio Bonito)"},{   _id: "M",    texto: "Faz retorno no Supermercado Extra"}], cor: "vermelho", ordem: 20},
    {numero: 23, horario: "22:00", origem: "Centro ", destino: "Barra", via: "UERJ/Copa ", observacoes:         [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"},{   _id: "K",    texto: "Rua São Clemente e Nelson Mandela (Embarque próximo ao metrô entre as ruas: Nelson Mandela e Vol. Da Pátria) e n° 45 da Vol. da Pátria (Ed. Barão do Rio Bonito)"},{   _id: "C",    texto: "Ponto passarela do Metrô de Sâo Cristovão, Av. Radial Oeste"}], cor: "vermelho", ordem: 20},


    {numero: 30, horario: "07:00", origem: "Barra ", destino: "Centro", via: "Copacabana", observacoes:         [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verdeSab sabado", ordem: 11},
    {numero: 30, horario: "10:00", origem: "Barra ", destino: "Centro", via: "J. Botânico", observacoes:        [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verdeSab sabado", ordem: 11},
    {numero: 30, horario: "13:00", origem: "Barra ", destino: "Centro", via: "Copacabana", observacoes:         [{   _id: "GC",   texto: "Ponto inicial Golden Center (Av. das Américas, 2111)"}], cor: "verdeSab sabado", ordem: 11},
    {numero: 30, horario: "08:15", origem: "Centro ", destino: "Barra", via: "Copacabana", observacoes:         [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"}], cor: "vermelhoSab sabado", ordem: 21},
    {numero: 30, horario: "11:30", origem: "Centro ", destino: "Barra", via: "J. Botânico", observacoes:        [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"}], cor: "vermelhoSab sabado", ordem: 21},
    {numero: 30, horario: "15:15", origem: "Centro ", destino: "Barra", via: "Copacabana", observacoes:         [{   _id: "O",    texto: "Via Praia de Botafogo pista interna"}], cor: "vermelhoSab sabado", ordem: 21},

    {numero:20, horario: "06:15", destino: "N.Leblon / Barra Mall/Cec",                     observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:18, horario: "06:20", destino: "J. Oceânico / Barrinha",                        observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:19, horario: "06:25", destino: "J. Oceânico / Barrinha",                        observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:21, horario: "06:25", destino: "N.Leblon (Pista Interna)",                      observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:22, horario: "06:30", destino: "Alfa Barra / P.Rosas",                          observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:23, horario: "06:40", destino: "Mac Donald's / J. Oceânico",                    observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:3, horario: "11:30", destino: "N. Leblon / B. Mall (Pista Interna)",            observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:1, horario: "11:45", destino: "Novo Leblon (Pista Interna)",                    observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:7, horario: "12:05", destino: "J. Oceânico / Barrinha",                         observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:5, horario: "12:10", destino: "J.Oceânico",                                     observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:2, horario: "12:15", destino: "Alfa Barra /P. Rosas/N. Leblon",                 observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:3, horario: "12:20", destino: "Barrinha",                                       observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:1, horario: "12:30", destino: "Barra Mall/Cec - BarraShopping",                 observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:1, horario: "16:30", destino: "N.Leblon (Pista Interna)",                       observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:1, horario: "17:40", destino: "J. Oceânico / Barrinha",                         observacoes: {   _id: "Seg a sex",    texto: "Segunda a sexta"}, cor: "amarelo", ordem: 30},
    {numero:4, horario: "08:15", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "09:30", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "10:30", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "11:30", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "13:30", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "14:30", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "15:30", destino: "Circ.Shop. (aos sábados)",                       observacoes: {   _id: "I",    texto: "Somente aos sábados e feriados. Atende ao Lgo. da Barra"},         cor: "amarelo sabado", ordem: 31},
    {numero:4, horario: "16:30", destino: "Circ.Shop. (aos sábados)",                       observacoes: {   _id: "I",    texto: "Somente aos sábados e feriados. Atende ao Lgo. da Barra"},         cor: "amarelo sabado", ordem: 31},
    {numero:4, horario: "17:20", destino: "B.Shopping/Mergulhão/N.Leblon",                  observacoes: {   _id: "Y",    texto: "Somente funciona de Segunda à Sexta"},         cor: "amarelo", ordem: 30},
    {numero:4, horario: "18:40", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "20:10", destino: "Circ.Shopping",                                                            cor: "amarelo", ordem: 30},
    {numero:4, horario: "21:10", destino: "Circ.Shopping",                                  observacoes: {   _id: "F",    texto: "Atenderá o Largo da Barra (2ª à 6ª)"},         cor: "amarelo", ordem: 30},
    {numero:4, horario: "22:10", destino: "Circ.Shopping",                                  observacoes: {   _id: "F",    texto: "Atenderá o Largo da Barra (2ª à 6ª)"},         cor: "amarelo", ordem: 30}

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
                                        console.log("Erro ao incluir uma OBSERVACAO --------------------------" + observacao._id + "  --------------------------" + err);
                                    } else {
                                        observacao.save();
                                        console.log("Observação adicionada: " + dado._id);
                                    }
                                });
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
                            });
                        
                            //popula dados de linha
                            dadosLinha.forEach(function(dado){
                                Linha.create(dado, function(err, linha){
                                    if(err){
                                        console.log("Erro ao incluir uma LINHA --------------------------" + dado.numero + " - " + dado.horario + " - " + dado.origem + " - " + dado.destino + " - " + dado.via + "  --------------------------" + err);
                                    } else {
                                        linha.save();
                                        console.log("Linha adicionada: " + dado.ordem + " - " + dado.numero + " - " + dado.horario + " - " + dado.origem + " - " + dado.destino + " - " + dado.via);
                                    }
                                });
                            });
                        }
                    });
                }
                
            });
        }
    });

};

module.exports = carregaTudo;
