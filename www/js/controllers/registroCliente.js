angular.module('starter.controllers')
    .controller('RegistroClienteCtrl', [
        '$scope', '$ionicModal', function ($scope, $ionicModal) {
            var efeito = 'fade-in-scale';

            $ionicModal.fromTemplateUrl('modal.html', {
                scope: $scope,
                animation: efeito
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.cliente = { nome: 'Glaicon', total: 200 }
            $scope.registro = {}

            limparRegistro();


            $scope.criarRegistro = function () {
                $scope.modal.show();
            };

            function limparRegistro() {
                $scope.registro = { ehRecibo: true, total: 0, descricao: '' }
            };

            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
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

        }]);
