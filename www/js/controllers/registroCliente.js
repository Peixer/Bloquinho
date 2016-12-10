angular.module('starter.controllers')
  .controller('RegistroClienteCtrl', [
    '$scope', '$ionicModal', '$stateParams', '$repositorio', '$ionicPopup', '$state', '$ionicLoading', '$ionicHistory', '$ionicListDelegate',
    function ($scope, $ionicModal, $stateParams, $repositorio, $ionicPopup, $state, $ionicLoading, $ionicHistory, $ionicListDelegate) {
      var efeito = 'fade-in-scale';

      $scope.cliente = {};
      $scope.registro = {}
      $scope.totalEntrada = 0;
      $scope.totalSaida = 0;

      $scope.estaComSaldoPositivo = function () {
        return $scope.cliente.total >= 0;
      };

      $ionicLoading.show({
        template: '<ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>',
        hideOnStageChange: true
      });

      inicializar();

      inicializarModal();

      limparRegistro();

      $scope.criarRegistro = function () {
        $scope.modal.show();
      };

      $scope.exibirRelatorio = function () {
        $scope.totalEntrada = calcularTotalEntrada();
        $scope.totalSaida = calcularTotalSaida();

        $scope.modalRelatorio.show();
      };

      $scope.salvarSaida = function () {
        if (validarRegistro()) {
          $scope.modal.hide();

          adicionarRegistroAoCliente(false);
          gravarInformacoesCliente();
          limparRegistro();
        }
      };

      $scope.salvarEntrada = function () {

        if (validarRegistro()) {
          $scope.modal.hide();

          adicionarRegistroAoCliente(true);
          gravarInformacoesCliente();
          limparRegistro();
        }
      };

      $scope.voltar = function () {
        $ionicHistory.goBack();
      };

      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });

      $scope.deletarRegistro = function (index) {
        removerRegistroDoCliente(index);
        gravarInformacoesCliente();

        $ionicListDelegate.closeOptionButtons();
      };

      function limparRegistro() {
        $scope.registro = {
          ehEntrada: true,
          valor: 0,
          descricao: '',
          data: new Date()
        }
      };

      function validarRegistro() {
        if ($scope.registro.descricao == '') {
          $ionicPopup.alert({
            title: 'Atenção',
            template: 'Descrição do registro está inválida'
          });
          return false;
        } else if ($scope.registro.valor == 0) {
          $ionicPopup.alert({
            title: 'Atenção',
            template: 'Valor do registro está inválido'
          });
          return false;
        }
        return true;
      };

      function inicializar() {
        var promisse = $repositorio.obterClienteComId($stateParams.id);

        setTimeout(function () {
          promisse.then(function (doc) {
            $scope.cliente = doc;
            console.log($scope.cliente);
            $ionicLoading.hide();
          });
        }, 1000);
      };

      function adicionarRegistroAoCliente(ehEntrada) {
        if ($scope.cliente.movimentacoes == null) {
          $scope.cliente.movimentacoes = [];
        }

        $scope.registro.ehEntrada = ehEntrada;
        $scope.registro.data = $scope.registro.data.toLocaleDateString();
        $scope.cliente.movimentacoes.push($scope.registro);

        if ($scope.registro.ehEntrada)
          $scope.cliente.total += $scope.registro.valor;
        else
          $scope.cliente.total -= $scope.registro.valor;
      };

      function removerRegistroDoCliente(index) {
        var registro = $scope.cliente.movimentacoes[index];

        if (registro.ehEntrada)
          $scope.cliente.total -= registro.valor;
        else
          $scope.cliente.total += registro.valor;

        $scope.cliente.movimentacoes.splice(index, 1);
      };

      function inicializarModal() {
        $ionicModal.fromTemplateUrl('modal.html', {
          scope: $scope,
          animation: efeito
        }).then(function (modal) {
          $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('modalRelatorio.html', {
          scope: $scope,
          animation: efeito
        }).then(function (modal) {
          $scope.modalRelatorio = modal;
        });
      };

      function gravarInformacoesCliente() {
        var promisseGravarCliente = $repositorio.gravarCliente($scope.cliente);
        promisseGravarCliente.then(function (resposta) {
          $scope.cliente._id = resposta.id;
          $scope.cliente._rev = resposta.rev;
        });
      };

      function calcularTotalEntrada() {

        var valor = 0;
        if ($scope.cliente.movimentacoes != null) {
          angular.forEach($scope.cliente.movimentacoes, function (registro, index) {
            if (registro.ehEntrada) {
              valor += registro.valor;
            }
          });
        }
        return valor;
      };

      function calcularTotalSaida() {

        var valor = 0;
        if ($scope.cliente.movimentacoes != null) {
          angular.forEach($scope.cliente.movimentacoes, function (registro, index) {
            if (!registro.ehEntrada) {
              valor += registro.valor;
            }
          });
        }
        return valor;
      };
    }
  ]);
