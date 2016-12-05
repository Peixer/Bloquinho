angular.module('starter.controllers')
    .controller('RegistroClienteCtrl', [
        '$scope', '$ionicModal', '$stateParams', '$repositorio',
        function ($scope, $ionicModal, $stateParams, $repositorio) {
            var efeito = 'fade-in-scale';

            $scope.cliente = {};
            $scope.registro = {}

            $scope.estaComSaldoPositivo = function () {
                return $scope.cliente.total >= 0;
            };

            inicializar();

            inicializarModal();

            limparRegistro();

            $scope.criarRegistro = function () {
                $scope.modal.show();
            };

            $scope.salvar = function () {
                if (validarRegistro()) {
                    $scope.modal.hide();

                    adicionarRegistroAoCliente();
                    gravarInformacoesCliente();
                    limparRegistro();
                }
            };

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            $scope.deletarRegistro = function (index) {
                removerRegistroDoCliente(index);
                gravarInformacoesCliente();
            };

            function limparRegistro() {
                $scope.registro = { ehEntrada: true, valor: 0, descricao: '', data: new Date() }
            };

            function validarRegistro() {
                if ($scope.registro.descricao == '' || $scope.registro.valor == 0) {
                    return false;
                    //colocar mensagem aqui
                }
                return true;
            };

            function inicializar() {
                $repositorio.obterClienteComId($stateParams.id).then(function (doc) {
                    $scope.cliente = doc;
                    console.log($scope.cliente);
                });
            };

            function adicionarRegistroAoCliente() {
                if ($scope.cliente.movimentacoes == null) {
                    $scope.cliente.movimentacoes = [];
                }

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
            };

            function gravarInformacoesCliente() {
                var promisseGravarCliente = $repositorio.gravarCliente($scope.cliente);
                promisseGravarCliente.then(function (resposta) {
                    $scope.cliente._id = resposta.id;
                    $scope.cliente._rev = resposta.rev;
                });
            };

        }]);
