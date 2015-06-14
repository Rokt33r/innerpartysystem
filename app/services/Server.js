var ipc = require('ipc')
angular.module('ips')
  .factory('Server', function ($rootScope) {
    var turnOn = function () {
      ipc.send('turnOnServer')
    }

    var turnOff = function () {
      ipc.send('turnOffServer')
    }

    var requestCurrentWifiName = function () {
      return ipc.sendSync('requestCurrentWifiName')
    }

    var requestCurrentIp = function () {
      return ipc.sendSync('requestCurrentIp')
    }

    var checkStatus = function () {
      return ipc.sendSync('checkServerStatus')
    }

    ipc.on('serverTurnedOn', function () {
      $rootScope.$broadcast('serverTurnedOn')
    })

    ipc.on('serverTurnedOff', function () {
      $rootScope.$broadcast('serverTurnedOff')
    })

    return {
      turnOn: turnOn,
      turnOff: turnOff,
      checkStatus: checkStatus,
      requestCurrentWifiName: requestCurrentWifiName,
      requestCurrentIp: requestCurrentIp
    }
  })
