angular.module('starter.controllers')
  .controller('RegistrosCtrl', [
    '$scope', '$repositorio', '$ionicLoading', '$state',
    function ($scope, $repositorio, $ionicLoading, $state) {

      $scope.registros = [];

      $ionicLoading.show({
        template: '<ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>',
        hideOnStageChange: true
      });

      inicializar();

      function inicializar() {

        var promisse = $repositorio.listar();
        setTimeout(function () {
          promisse.then(function (clientes) {
            angular.forEach(clientes.rows, function (cliente, index) {
              angular.forEach(cliente.doc.movimentacoes, function (registro, indexRegistro) {

                var registroDoCliente = {
                  id: cliente.doc._id,
                  nome: cliente.doc.nome,
                  valor: registro.valor,
                  descricao: registro.descricao,
                  ehEntrada: registro.ehEntrada,
                  data: registro.data
                };

                $scope.registros.push(registroDoCliente);
              });
            });


            $scope.registros.sort(function (a, b) {
              return  new Date(b.data).getTime() - new Date(a.data).getTime() 
            }); 
            console.log($scope.registros);
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
          }, function (data) {
            $scope.$broadcast('scroll.refreshComplete');
          });
        }, 1000);
      };

      $scope.navegarParaTelaDeRegistros = function (index) {
        var registro = $scope.registros[index];
        $state.go('registroCliente', {
          "id": registro.id
        });
      };

      $scope.recarregarListaRegistros = function () {
        $scope.registros = [];
        inicializar();
      };
    }
  ]);
