var remote = require('remote')
var dialog = remote.require('dialog')

angular.module('ips')
  .factory('Finder', function () {
    var rootDir = null

    var getRootDir = function () {
      return rootDir
    }

    var selectRootDir = function () {
      return new Promise(function (resolve, reject) {
        dialog.showOpenDialog({
          properties: ['openFile', 'openDirectory']
        }, function (filename) {
          resolve(filename)
        })
      })
    }

    return {
      getRootDir: getRootDir,
      selectRootDir: selectRootDir
    }
  })
