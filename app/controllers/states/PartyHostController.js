angular.module('ips')
  .controller('PartyHostController', function (Server, $scope, Socket, $window, Finder) {
    var vm = this

    vm.rootDir = Finder.getRootDir()

    if (vm.rootDir == null) {
      Finder.selectRootDir()
        .then(function (filename) {
          $scope.$apply(function () {
            vm.rootDir = filename
          })
        })
    }

    vm.turnOffServer = function () {
      Server.turnOff()
      Socket.disconnect()
    }
    vm.checkStatus = function () {
      $scope.isServerOn = Server.checkStatus()
    }
    vm.sayHello = function () {
      Socket.sayHello()
    }

    Socket.connect('localhost')
  })
