var ipc = require('ipc')
angular.module('ips')
  .factory('Server', function () {
    var turnOn = function () {
      ipc.send('turnOnServer')
    }

    var turnOff = function () {
      ipc.send('turnOffServer')
    }

    var checkStatus = function () {
      return ipc.sendSync('checkStatus')
    }

    return {
      turnOn: turnOn,
      turnOff: turnOff,
      checkStatus: checkStatus
    }
  })
