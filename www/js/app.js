angular.module('starter.controllers', []);

angular.module('starter', [
    'ionic',
    'starter.controllers'])

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
            .state('clientes', {
                url: '/clientes',
                templateUrl: 'templates/cliente/lista_clientes.html',
                controller: 'ClientesCtrl'
            })
            .state('registros', {
                url: '/registros',
                templateUrl: 'templates/registro/lista_registros.html',
                controller: 'RegistrosCtrl'
            })
            .state('cliente', {
                abstract: true,
                cache: false,
                url: '/cliente',
                templateUrl: 'templates/menu.html',
                controller: 'MenuCtrl'
            })
            .state('cliente.detalhes', {
                url: '/detalhes',
                templateUrl: 'templates/cliente/detalhesCliente.html',
                controller: 'DetalhesClienteCtrl'
            });

        $urlRouterProvider.otherwise('/clientes');
    });
