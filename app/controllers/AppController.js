angular.module('ips')
  .controller('AppController', function (Server) {
    var app = this

    app.turnOnServer = function () {
      Server.turnOn()
    }
    app.turnOffServer = function () {
      Server.turnOff()
    }

  })
