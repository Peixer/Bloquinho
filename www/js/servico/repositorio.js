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

        this.gravarCliente = function (item) {
            db.post({
                nome: item.nome,
                total: item.total,
                endereco: item.endereco,
                email: item.email,
                telefone: item.telefone
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error);
            });
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
