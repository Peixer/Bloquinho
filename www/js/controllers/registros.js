angular.module('starter.controllers')
  .controller('RegistrosCtrl', [
    '$scope', '$repositorio', '$ionicLoading',
    function ($scope, $repositorio, $ionicLoading) {

      $scope.registros = [];
      inicializar();

      function inicializar() {

        $ionicLoading.show({
          template: '<ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>',
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

          console.log($scope.registros);
          $scope.$broadcast('scroll.refreshComplete');        
          $ionicLoading.hide();
        }, function (data) {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.refresh = function () {
        $scope.registros = [];
        inicializar();
      };

      $scope.filtroPorData = function (registro) {
        return new Date(registro.data);
      };
    }
  ]);
