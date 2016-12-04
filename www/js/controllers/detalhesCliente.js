angular.module('starter.controllers')
    .controller('DetalhesClienteCtrl', [
        '$scope', function ($scope) {

            var db;
            inicializarDB();

            adicionarPrimeiroItem();
            obterTodosItens();
            //obterTodosItensComIndex();
            //sincronizarItems();


            function inicializarDB() {
                db = new PouchDB('teste1', { adapter: 'websql' });
            };

            function obterTodosItens() {
                db.allDocs({
                    include_docs: true
                }).then(function (result) {

                    console.log(result);
                    angular.forEach(result.rows, function (value, key) {
                        console.log(value.doc.title);
                    });

                }).catch(function (error) {
                    console.log(error);
                });
            };

            function obterTodosItensComIndex() {
                db.query('index/by_name').then(function (res) {
                    console.log(res)
                }).catch(function (err) {
                    console.log(err)
                });
            };
            
            function sincronizarItems() {
                PouchDB.sync('teste1', 'http://localhost:5984/teste1');
            };

            function adicionarPrimeiroItem() {
                db.post({
                    title: 'Ziggy2 - teste 2'
                }).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error);
                })
            };

        }]);
