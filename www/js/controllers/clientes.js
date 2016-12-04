angular.module('starter.controllers')
  .controller('ClientesCtrl', [
    '$scope', '$state', '$ionicActionSheet', '$ionicLoading', '$repositorio',
    function ($scope, $state, $ionicActionSheet, $ionicLoading, $repositorio) {
      $scope.clientes = [];

      function inicializar() {
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>',
          hideOnStageChange: true
        });

        $scope.clientes = $repositorio.listarClientes();
        console.log($scope.clientes);

        $ionicLoading.hide();
      };

      inicializar();

      $scope.adicionarCliente = function () {
        $state.go('adicionarCliente', { "cliente": null });
      };

      $scope.editarCliente = function (index) {
        var cliente = $scope.clientes[index];

        $state.go('editarCliente', { "cliente": JSON.stringify(cliente) });
      };

      $scope.deletarCliente = function (index) {
        var cliente = $scope.clientes[index];

        $repositorio.deletarCliente(cliente);
        inicializar();
      }
    }
  ]);
