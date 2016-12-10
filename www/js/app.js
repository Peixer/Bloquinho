angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('starter.directives', []);

angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'starter.directives',
  'ngResource',
  'ngCordova'
])

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

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.transition('none');

  $stateProvider
    .state('adicionarCliente', {
      cache: false,
      url: '/adicionar-cliente/{id}',
      templateUrl: 'templates/cliente/adicionarCliente.html',
      controller: 'AdicionarClienteCtrl'
    })
    .state('editarCliente', {
      cache: false,
      url: '/editar-cliente/{id}',
      templateUrl: 'templates/cliente/editarCliente.html',
      controller: 'AdicionarClienteCtrl'
    })
    .state('registroCliente', {
       cache: false,
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
