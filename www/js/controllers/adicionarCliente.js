angular.module('starter.controllers')
    .controller('AdicionarClienteCtrl', [
        '$scope', '$state', '$repositorio', '$ionicPopup', '$stateParams',
        function ($scope, $state, $repositorio, $ionicPopup, $stateParams) {

            $scope.cliente = {}
            inicializarCliente();

            $scope.adicionarCliente = function () {

                if (validarCampos()) {
                    $repositorio.gravarCliente($scope.cliente);

                    $state.go('tab.clientes');
                }
            };

            function validarCampos() {

                if ($scope.cliente.nome == '') {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Nome está inválido'
                    });

                    return false;
                } else if ($scope.cliente.email == '') {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Email está inválido'
                    });

                    return false;
                }

                return true;
            };

            function inicializarCliente() {
                if ($stateParams.cliente != '') {
                    $scope.cliente = JSON.parse($stateParams.cliente);
                } else {
                    $scope.cliente = {
                        total: 0,
                        telefone: '',
                        email: '',
                        nome: '',
                        endereco: ''
                    };
                }
            }


        }
    ]);
