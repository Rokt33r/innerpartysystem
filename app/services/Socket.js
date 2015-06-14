var ipc = require('ipc')

angular.module('ips')
  .factory('Socket', function (hostname) {
    var socket = null

    var updateHost = function (url) {
      ipc.send('updateHost', url)
    }
    var connect = function (url) {
      socket = io.connect('http://' + url + ':8080', {'forceNew': true})
      socket.on('news', function (data) {
        console.log(data)
        socket.emit('msg', { my: 'data' })
        socket.emit('registerName', { name: hostname })
      })

      socket.on('userUpdated', function (users) {
        console.log(users)
      })

      socket.on('pushed', function (){
        console.log('pushing detected!! ready to PULL!!')
        ipc.send('requestPull')
      })
    }

    var disconnect = function () {
      if (socket == null) return
      socket.disconnect()
      socket = null
      console.log('disconnect socket')
    }

    var sayHello = function () {
      if (socket == null) return
      console.log('emit...')
      socket.emit('msg', {'msg': 'Hello!'})
    }

    return {
      connect: connect,
      disconnect: disconnect,
      sayHello: sayHello,
      updateHost: updateHost
    }
  })
