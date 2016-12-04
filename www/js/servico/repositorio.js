angular.module('starter.services')
    .service('$repositorio', [function () {
        var db;

        function inicializarDB() {
            db = new PouchDB('bloquinho_sql', { adapter: 'websql' });
        };

        if (!db)
            inicializarDB();

        this.listarClientes = function () {
            var items = [];

            db.allDocs({
                include_docs: true
            }).then(function (result) {
                angular.forEach(result.rows, function (value, key) {
                    items.push(value.doc);
                });
            }).catch(function (error) {
                console.log(error);
            });

            return items;
        };

        this.listar = function () {
            return db.allDocs({
                include_docs: true
            });
        };

        this.gravarCliente = function (cliente) {
            if (cliente._id != null) {
                atualizarCliente(cliente);
            } else {
                adicionarCliente(cliente);
            }
        };

        function adicionarCliente(cliente) {
            db.post({
                nome: cliente.nome,
                total: cliente.total,
                endereco: cliente.endereco,
                email: cliente.email,
                telefone: cliente.telefone
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error);
            });
        };

        function atualizarCliente(cliente) {
            db.put({
                _id: cliente._id,
                _rev: cliente._rev,
                nome: cliente.nome,
                total: cliente.total,
                endereco: cliente.endereco,
                email: cliente.email,
                telefone: cliente.telefone
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error);
            });
        };

        this.deletarCliente = function (item) {
            db.remove(item._id, item._rev);
        };

    }]);

//todo como deveria ficar o registro de cliente
// {
//     Nome,
//         Endereco,
//         Telefone,
//         Email,
//         Movimentacoes: [
//             { Descricao, Valor, EhEntrada }
//         ]
// }
