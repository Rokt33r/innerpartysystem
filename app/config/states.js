angular.module('ips')
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'tpls/states/home.tpl.html',
        controller: 'HomeController as vm'
      })
      .state('party-host', {
        url: '/party-host',
        templateUrl: 'tpls/states/party-host.tpl.html',
        controller: 'PartyHostController as vm'
      })
      .state('party-guest', {
        url: '/party-guest?address',
        templateUrl: 'tpls/states/party-guest.tpl.html',
        controller: 'PartyGuestController as vm'
      })
  })
