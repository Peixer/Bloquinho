/**
 * Created by Glaicon on 01/02/2016.
 */


angular.module('starter.controllers')
    .controller('ClientesCtrl', [
        '$scope', '$state', '$ionicActionSheet', function ($scope, $state, $ionicActionSheet) {
            $scope.clientes = [
                {nome: 'Glaicon', total: '222', estaNegativo: true}, {
                    nome: 'João',
                    total: '62',
                    estaNegativo: false
                }];

            $scope.proximaTela = function () {
                $state.go('cliente');
            };

            $scope.showActionSheet = function () {
                $ionicActionSheet.show({
                    buttons: [
                        {text: 'Ver Detalhes'},
                        {text: 'Ver Entrega'}
                    ],
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
        }]);
