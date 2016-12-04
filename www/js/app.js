angular.module('starter.controllers', []);
angular.module('starter.services', []);

angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('detalhesClientes', {
                url: '/detalhes',
                templateUrl: 'templates/cliente/detalhesCliente.html',
                controller: 'DetalhesClienteCtrl'
            })
            .state('adicionarClientes', {
                url: '/adicionar-cliente',
                templateUrl: 'templates/cliente/adicionarCliente.html',
                controller: 'AdicionarClienteCtrl'
            })
            .state('tab', {
                abstract: true,
                url: '/tab',
                templateUrl: 'templates/tab.html',
                controller: 'MenuCtrl'
            })
            .state('tab.registros', {
                url: '/tab-registros',
                views: {
                    'registros': {
                        templateUrl: 'templates/registro/lista_registros.html',
                        controller: 'RegistrosCtrl'
                    }
                }
            })
            .state('tab.clientes', {
                url: '/tab-clientes',
                views: {
                    'clientes': {
                        templateUrl: 'templates/cliente/lista_clientes.html',
                        controller: 'ClientesCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/tab-registros');
    });
