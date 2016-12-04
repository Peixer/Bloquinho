angular.module('starter.controllers')
  .controller('ClientesCtrl', [
    '$scope', '$state', '$ionicActionSheet', '$ionicLoading', '$repositorio',
    function ($scope, $state, $ionicActionSheet, $ionicLoading, $repositorio) {

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

      function adicionarCliente2() {

        var item = {
          nome: "Joao Vilmar Peixer",
          email: "jveixer@hotmail.com",
          endereco: "Rua dos caçadores",
          total: 300
        }

        $repositorio.gravarCliente(item);
      };

      $scope.adicionarCliente = function () {
        $state.go('adicionarClientes');
      };

      $scope.proximaTela = function () {
        $state.go('detalhesClientes');
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
