angular.module('starter.controllers')
    .controller('AdicionarClienteCtrl', [
        '$scope', '$repositorio', '$ionicPopup', function ($scope, $repositorio, $ionicPopup) {

            $scope.cliente = {};
            inicializarCliente();

            $scope.adicionarCliente = function () {

                if (validarCampos()) {
                    $repositorio.gravarCliente($scope.cliente);
                    inicializarCliente();
                }
            };

            function validarCampos() {

                if ($scope.cliente.nome == '') {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Nome está inválido'
                    });

                    return false;
                }
                else if ($scope.cliente.email == '') {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Email está inválido'
                    });

                    return false;
                }

                return true;
            };

            function inicializarCliente() {
                $scope.cliente = {
                    total: 0,
                    telefone: '',
                    email: '',
                    nome: '',
                    endereco: ''
                };

            }

        }]);