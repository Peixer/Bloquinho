angular.module('starter.controllers', []);
angular.module('starter.services', []);

angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services',
    'ngResource',
    'ngCordova'])

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
            .state('adicionarCliente', {
                url: '/adicionar-cliente/{id}',
                templateUrl: 'templates/cliente/adicionarCliente.html',
                controller: 'AdicionarClienteCtrl'
            })
            .state('editarCliente', {
                url: '/editar-cliente/{id}',
                templateUrl: 'templates/cliente/editarCliente.html',
                controller: 'AdicionarClienteCtrl'
            })
            .state('registroCliente', {
                url: '/registro-cliente/{id}',
                templateUrl: 'templates/registro/registroCliente.html',
                controller: 'RegistroClienteCtrl'
            })
            .state('tab', {
                abstract: true,
                cache: false,
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
