function ListaDAO() {
    var listas = {};
    // - Criar nova lista
    this.criarLista = function(nome) {
        // 1. Gerar ID
        var novoID = "lista-" + Object.keys(this.listas).length;
        // 2. Criar objeto da lista
        var novaLista = {
            id: novoID,
            nome: nome,
            tarefas: [],
            numeroDeTarefas: 0
        };
        // 3. Adicionar nova lista ao objeto listas
        this.listas[novoId] = novaLista;

        return {
            success: true,
            message: "LIsta \'" + nome + "\' criada."
        };
    };
    // - Renomear Lista
    this.renomearLista = function(listaID, novoNome) {
        // 1. Testa se a lista existe
        if (this.listas.hasOwnProperty(listaID)) {
            // 2. Troca nome da lista pelo novo nome
            this.listas[listaID].nome = novoNome;
            console.log();
            return {
                success: true,
                message: "Lista renomeada para \'"+ novoNome + "\'."
            }
        } else {
            return {
                success: false,
                message: "Lista não pode ser encontrada"
            };
        }
    };
    // - Apagar Lista
    this.apagarLista = function(listaID) {
        // 1. Testa se a lista existe
        if(this.listas.hasOwnProperty(listaID)) {
            var nomedaLIsta = this.listas[listaID].nome;
            // 2. Exclui a lista
            delete this.listas[listaID];
            return {
                success: true,
                message: "Lista \'" + nomedaLIsta + "\' apagada com sucesso"
            }
        } else {
            return {
                success: false,
                message: "Lista não pode ser encontrada"
            };
        }
    };
    // - Lista todas as listas
    this.getListas = function() {
        return this.listas;
    };
    // - Criar nova tarefa em uma lista
    this.novaTarefa = function(descricao, listaID) {
        // 1. Cria o identificador da tarefa
        var idTarefa = "tarefa-" + this.listas[listaID].numeroDeTarefas;
        // 2. Cria o objeto da tarefa
        var tarefa = {
            id: idTarefa,
            descricao: descricao,
            completa: false
        };
        // 3. Adiciona a tarefa na lista de tarefas
        this.listas[listaID].tarefas.push(tarefa);
        this.listas[listaID].numeroDeTarefas += 1;
        return {
            success: true,
            message: "Tarefa adiciona na lista "+ this.listas[listaID].nome
        };
    };
    // - Alternar tarefa para completa ou não completa
    this.toogleTarefa = function(listaID, tarefaID) {
        // 1. Percorre as tarefas da lista
        for (var i = 0; i < this.listas[listaID].tarefas.length; i++) {
            // 2. Quando encontrar a tarefa..
            if (this.listas[listaID].tarefas[i].id == tarefaID) {
                // ... troca o valor da propriedade `completa`
                this.listas[listaID].tarefas[i].completa 
                    = !this.listas[listaID].tarefas[i].completa;
                return {
                    success: true,
                    message: "Tarefa \'" + tarefaID + "\': "
                        + this.listas[listaID].tarefas[i].completa
                };
            }
        }
    };
    // - Apagar tarefa em uma lista
    this.apagarTarefa = function(listaID, tarefaID) {
        // 1. Percorre as tarefas da lista
        for (var i = 0; i < this.listas[listaID].tarefas.length; i++) {
            // 2. Quando encontrar a tarefa...
            if (this.listas[listaID].tarefas[i].id == tarefaID) {
                // ... apaga a tarefa no array de tarefas da lista
                this.listas[listaID].tarefas.splice(i, 1);
                console.log("ListaDAO: Tarefa \'%s\' apagada com sucesso.", tarefaID);
                break;
            }
        }
    };
    // - Listar tarefas de uma lista
    this.getTarefas = function(listaID) {
        return this.listas[listaID].tarefas;
    };
}

module.exports = new ListaDAO();

