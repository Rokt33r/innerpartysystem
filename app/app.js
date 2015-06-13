var os = require("os")

angular.module('ips', ['ui.router'])
  .constant('hostname', os.hostname())
  .run(function () {

  })
