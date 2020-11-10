// 1. Importar módulos
var express = require("express");
var bodyParser = require("body-parser");
// 2. Importar o módulo da aplicação
var ListaDAO = require("./listaDAO");
// 3. Iniciar a aplicação Express
var app = express();
// 4. Configurar método para ler a propriedade `body` das requisições
app.use(bodyParser.json());

// CRIAR ROTAS AQUI

// - Criar nova lista
app.post("/lista", function(request, response) {
    // Pega nome da propriedade body do request
    var nome = request.body.nome;
    // Cria nova lista
    var result = ListaDAO.criarLista(nome);

    response.status(200);
    response.json(result);
    response.end();
}); 

// - Renomear Lista
app.put("/lista/:id_lista", function(request, response) {
    // Pega o novo nome da propriedade body do request
    var novoNome = request.body.nome;
    // Pega o id da lista dos parametros da rota
    var idDaLista = request.params.id_lista;
    // Renomeia a lista
    var result = ListaDAO.renomearLista(idDaLista, novoNome);
    response.status(200);
    response.json(result);
    response.end();
});

// Apagar Lista

app.delete("/lista/:id_lista", function(request, response) {
    // Pega o ID da lista a ser apagada
    var idDaLista = request.params.id_lista;
    // Apaga a lista com o identificador
    var result = ListaDAO.apagarLista(idDaLista);
    response.status(200);
    response.json(result);
    response.end();
});

// Listar todas as listas

app.get("/lista", function(resquest, response) {
    response.status(200);
    response.json(ListaDAO.getListas());
    response.end();
});

// Criar nova tarefa em uma lista

app.post("/lista/:id_lista", function(request, response) {
    // Pega as informações prevenientes da requisição
    var idDaLista = request.params.id_lista;
    var descricaoDaTarefa = request.body.descricao; 
    // Adiciona a nova tarefa na lista de tarefas
    var result = ListaDAO.novaTarefa(descricaoDaTarefa, idDaLista);
    response.status(200);
    response.json(result);
    response.end();
});

// Alterar tarefa para completa ou não completa

app.put("/lista/:id_lista/tarefa/:id_tarefa", function(resquest, response) {
    // Pega as informações provenientes da requisição
    var idDaLista = request.params.id_lista;
    var idDaTarefa = request.params.id_tarefa;
    // Alterna o estado da tarefa
    var result = ListaDAO.toggleTarefa(idDaLista, idDaTarefa);
    response.status(200);
    response.josn(result);
    response.end();
});

// Apagar tarefa de uma lista

app.delete("/lista/:id_lista/tarefa/:id_tarefa", function(resquest, response) {
    // Pega as informações provenientes da requisição
    var idDaLista = request.params.id_lista;
    var idDaTarefa = request.params.id_tarefa;
    // Apaga a tarefa da lista de tarefas
    var result = ListaDAO.apagarTarefa(idDaLista, idDaTarefa);
    response.status(200);
    response.json(result);
    response.end();
});

// Listar tarefas de uma lista

app.get("/lista/:id_lista/tarefa", function(request, response) {
    // Pegar o identificador da lsita na rota
    var idDaLista = request.params.id_lista;
    response.status(200);
    response.json(ListaDAO.getTarefas(idDaLista));
    response.end();
});

// 5. Associar a API com a porta 8080
app.listen(8080);