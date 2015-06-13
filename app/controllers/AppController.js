angular.module('ips')
  .controller('AppController', function (Server, $scope) {
    var app = this
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

    app.turnOnServer = function () {
      Server.turnOn()
    }
    app.turnOffServer = function () {
      Server.turnOff()
    }
    app.checkStatus = function () {
      $scope.isServerOn = Server.checkStatus()
      console.log('Server status :', $scope.isServerOn)
    }

  })
