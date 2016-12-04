angular.module('starter.controllers')
    .controller('EditarClienteCtrl', [
        '$scope', '$state', '$stateParams','$repositorio', function ($scope, $state, $stateParams,$repositorio) {

            $scope.cliente = JSON.parse($stateParams.product);

            $scope.deletarCliente = function () {
                $repositorio.deletarCliente($scope.cliente);
                $state.go('tab.clientes');
            };

            $scope.editarCliente = function () {
                $state.go('editarClientes');
            }

        }]);