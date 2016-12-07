angular.module('starter.controllers')
  .controller('ClientesCtrl', [
    '$scope', '$state', '$ionicActionSheet', '$repositorio', '$ionicListDelegate',
    function ($scope, $state, $ionicActionSheet, $repositorio, $ionicListDelegate) {
      $scope.clientes = [];

      inicializar();

      $scope.adicionarCliente = function () {
        $state.go('adicionarCliente', {
          "id": ""
        });
      };

      $scope.editarCliente = function (index) {
        var cliente = $scope.clientes[index];

        $state.go('editarCliente', {
          "id": cliente._id
        });

        $ionicListDelegate.closeOptionButtons();
      };

      $scope.deletarCliente = function (index) {
        var cliente = $scope.clientes[index];

        $repositorio.deletarCliente(cliente);

        $ionicListDelegate.closeOptionButtons();

        $scope.clientes.splice(index, 1);
      };

      $scope.refresh = function () {
        inicializar();
      };

      $scope.registros = function (index) {
        var cliente = $scope.clientes[index];
        $state.go('registroCliente', {
          "id": cliente._id
        });
      };

      $scope.estaPositivo = function (index) {
        var cliente = $scope.clientes[index];
        return cliente.total >= 0;
      };

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
    }
  ]);
