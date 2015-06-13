angular.module('ips')
  .controller('AppController', function (Server, $scope, $state) {
    var app = this
    $scope.isServerOn = false

    $scope.$on('serverTurnedOn', function () {
      console.log('Server Activated')
      $scope.$apply(function () {
        $scope.isServerOn = true
      })
      $state.go('party-host')
    })

    $scope.$on('serverTurnedOff', function () {
      console.log('Server Terminated')
      $scope.$apply(function () {
        $scope.isServerOn = false
      })
      $state.go('home')
    })

  })
