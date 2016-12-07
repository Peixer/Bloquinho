angular.module('starter.controllers')
  .controller('AdicionarClienteCtrl', [
    '$scope', '$state', '$repositorio', '$ionicPopup', '$stateParams', '$ionicHistory',
    function ($scope, $state, $repositorio, $ionicPopup, $stateParams, $ionicHistory) {

      $scope.cliente = {}

      inicializarCliente();

      $scope.adicionarCliente = function () {

        if (validarCampos()) {
          $repositorio.gravarCliente($scope.cliente);

          zerarCliente();
          
          $state.go('tab.clientes', {}, {
            reload: true
          });
        }
      };

      $scope.limpar = function () {
        inicializarCliente();
      };

      $scope.voltar = function () {
        $ionicHistory.goBack();
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
        if ($stateParams.id != '') {
          $repositorio.obterClienteComId($stateParams.id).then(function (doc) {
            $scope.cliente = doc;
            $scope.$apply()
          });
        } else {
          zerarCliente();
        }
      };

      function zerarCliente() {
        $scope.cliente = {
          total: 0,
          telefone: '',
          email: '',
          nome: '',
          endereco: ''
        };
      };
    }
  ]);
