angular.module('ips')
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'tpls/states/home.tpl.html',
      controller: 'HomeController as vm'
    })
  })
