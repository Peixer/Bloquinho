angular.module('starter.controllers')
    .controller('RegistroClienteCtrl', [
        '$scope', '$ionicModal', '$stateParams', '$repositorio', function ($scope, $ionicModal, $stateParams, $repositorio) {
            var efeito = 'fade-in-scale';

            $scope.cliente = {};
            $scope.registro = {}
            $scope.total = 200;
            
            $scope.estaComSaldoPositivo = function () {
                return $scope.cliente.total >= 0;
            };

            inicializar();

            limparRegistro();

            $scope.criarRegistro = function () {
                $scope.modal.show();
            };

            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.salvar = function () {
                if (validarRegistro()) {
                    $scope.modal.hide();

                    adicionarRegistroAoCliente();

                    $repositorio.gravarCliente($scope.cliente);

                    limparRegistro();
                }
            };

            function adicionarRegistroAoCliente() {

                if ($scope.cliente.movimentacoes == null) {
                    $scope.cliente.movimentacoes = [];
                }

                $scope.cliente.movimentacoes.push($scope.registro);

                $scope.cliente.total += $scope.registro.valor;
                // incluir logica do valor negativo depois
            };

            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

            function limparRegistro() {
                $scope.registro = { ehRecibo: true, valor: 0, descricao: '' }
            };

            function validarRegistro() {
                if ($scope.registro.descricao == '' || $scope.registro.valor == 0) {
                    return false;
                    //colocar mensagem aqui
                }
                return true;
            };

            function inicializar() {
                $ionicModal.fromTemplateUrl('modal.html', {
                    scope: $scope,
                    animation: efeito
                }).then(function (modal) {
                    $scope.modal = modal;
                });

                $repositorio.obterClienteComId($stateParams.id).then(function (doc) {
                    $scope.cliente = doc;
                    console.log($scope.cliente);
                });
            };

        }]);
