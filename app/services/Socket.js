angular.module('ips')
  .factory('Socket', function () {
    var socket = null

    var connect = function (url) {
      socket = io.connect('http://' + url + ':8080', {'forceNew': true});
      socket.on('news', function (data) {
        console.log(data)
        socket.emit('msg', { my: 'data' })
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
      sayHello: sayHello
    }
  })
