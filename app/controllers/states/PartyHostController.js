angular.module('ips')
  .controller('PartyHostController', function (Server, $scope, Socket) {
    var vm = this

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
    console.log('conn socket')

  })
