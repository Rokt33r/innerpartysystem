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
    vm.requestCurrentWifiName = function () {
      vm.currentWifiName = Server.requestCurrentWifiName()
    }
    vm.requestCurrentWifiName()

    vm.requestCurrentIp = function () {
      vm.currentIp = Server.requestCurrentIp()
    }
    vm.requestCurrentIp()

    vm.updateHost = function () {
      Socket.updateHost('localhost')
    }
    vm.updateHost()

    Socket.connect('localhost')
  })
