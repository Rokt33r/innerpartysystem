angular.module('ips')
  .controller('HomeController', function (Server, $scope, $state) {
    var vm = this
    $scope.isServerOn = false

    $scope.$on('serverTurnedOn', function () {
      console.log('Server Activated')
      $scope.$apply(function () {
        $scope.isServerOn = true
      })
    })

    $scope.$on('serverTurnedOff', function () {
      console.log('Server Terminated')
      $scope.$apply(function () {
        $scope.isServerOn = false
      })
    })

    vm.turnOnServer = function () {
      Server.turnOn()
    }
    vm.turnOffServer = function () {
      Server.turnOff()
    }
    vm.checkStatus = function () {
      $scope.isServerOn = Server.checkStatus()
      console.log('Server status :', $scope.isServerOn)
    }

  })
