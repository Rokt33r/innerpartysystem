var remote = require('remote')
var dialog = remote.require('dialog')

angular.module('ips')
  .factory('Finder', function () {
    var rootDir = null
    var watcher = null

    var getRootDir = function () {
      return rootDir
    }

    var selectRootDir = function () {
      return new Promise(function (resolve, reject) {
        dialog.showOpenDialog({
          properties: ['openDirectory', 'createDirectory']
        }, function (filename) {
          ipc.send('watchFile', filename[0])
          resolve(filename[0])
        })
      })
    }

    return {
      getRootDir: getRootDir,
      selectRootDir: selectRootDir
    }
  })
