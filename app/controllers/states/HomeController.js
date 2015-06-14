angular.module('ips')
  .controller('HomeController', function (Server, $scope, $state) {
    var vm = this

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
    vm.requestCurrentWifiName = function () {
      vm.currentWifiName = Server.requestCurrentWifiName()
    }
    vm.joinParty = function () {
      $state.go('party-guest', {address: vm.address})
    }
    vm.requestCurrentWifiName()
  })
