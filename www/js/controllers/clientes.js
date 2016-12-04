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
        $state.go('adicionarClientes');
      };

      $scope.detalhesCliente = function (index) {
        var cliente = $scope.clientes[index];

        $state.go('detalhesClientes', { "product": JSON.stringify(cliente) });
      };

      $scope.showActionSheet = function () {
        $ionicActionSheet.show({
          buttons: [{
            text: 'Ver Detalhes'
          }, {
            text: 'Ver Entrega'
          }],
          titleText: 'O que fazer?',
          cancelText: 'Cancelar',
          cancel: function () {
            // Fazer alguma p/ cancelamento
          },
          buttonClicked: function (index) {
            switch (index) {
              case 0:
                break;
              case 1:
                break;
            }
          }
        });
      };
    }
  ]);
