angular.module('starter.controllers')
    .controller('RegistrosCtrl', [
        '$scope', '$repositorio', '$ionicLoading', function ($scope, $repositorio, $ionicLoading) {

            $scope.registros = [];
            inicializar();

            function inicializar() {
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner>',
                    hideOnStageChange: true
                });

                var clientes = $repositorio.listar().then(function (clientes) {

                    angular.forEach(clientes.rows, function (cliente, index) {
                        angular.forEach(cliente.doc.movimentacoes, function (registro, indexRegistro) {

                            var registroDoCliente = {
                                nome: cliente.doc.nome,
                                valor: registro.valor,
                                descricao: registro.descricao,
                                ehEntrada: registro.ehEntrada,
                                data: registro.data
                            };

                            $scope.registros.push(registroDoCliente);
                        });
                    });
                    
                    console.log( $scope.registros);
                    $ionicLoading.hide();
                });
            };

        }]);
