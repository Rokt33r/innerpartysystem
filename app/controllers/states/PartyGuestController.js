angular.module('ips')
  .controller('PartyGuestController', function ($state, Finder, Socket, Server, $scope) {
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

    vm.leaveParty = function () {
      Socket.disconnect()
      $state.go('home')
    }

    vm.requestCurrentWifiName = function () {
      vm.currentWifiName = Server.requestCurrentWifiName()
    }
    vm.requestCurrentWifiName()

    vm.updateHost = function () {
      Socket.updateHost($state.params.address)
    }
    vm.currentIp = $state.params.address
    vm.updateHost()

    Socket.connect($state.params.address)
  })
