angular.module('starter.controllers')
  .controller('ClientesCtrl', [
    '$scope', '$state', '$ionicActionSheet', '$ionicLoading', '$repositorio',
    function ($scope, $state, $ionicActionSheet, $ionicLoading, $repositorio) {
      $scope.clientes = [];

      function inicializar() {
        $repositorio.listar().then(function (data) {
          var items = [];
          angular.forEach(data.rows, function (value, key) {
            items.push(value.doc);
          });
          console.log(items);

          $scope.clientes = items;
          $scope.$broadcast('scroll.refreshComplete');
        }, function (data) {
          $scope.$broadcast('scroll.refreshComplete');
        });
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

      $scope.doRefresh = function () {
        inicializar();
      };

      $scope.registros = function (index) {

        var cliente = $scope.clientes[index];
        $state.go('registroCliente', { "id": cliente._id });
      };
    }
  ]);
