var express = require('express')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var enableDestroy = require('server-destroy')
var SocketServer = require('socket.io')
var server = null
var io = null

var pushover = require('pushover')
var repos = pushover(__dirname + '/../repos')

var turnOn = function () {
  var app = express()
  app.use(express.static(__dirname + '/public'))

  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({'extended': 'true'}))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(function (req, res, next) {
    res.header({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'PUT, DELETE, GET, POST, HEAD, OPTIONS'
    })
    next()
  })
  app.options('*', function (req, res) {
    res.send('OK')
  })

  app.get('/', function (req, res) {
    res.send('hello')
  })

  server = app.listen(8080)
  enableDestroy(server)

  // SOCKET.IO
  var sockets = []
  var clients = {}
  io = SocketServer(server)

  io.on('connection', function (socket) {
    console.log('somebody connected')
    sockets.push(socket)

    socket.emit('news', {msg: 'welcome'})

    socket.on('msg', function (data) {
      console.log(data)
    })

    socket.on('registerName', function (data) {
      console.log('name registered')
      clients[socket.id] = data.name
      socket.emit('userUpdated', clients)
    })

    socket.on('disconnect', function () {
      delete clients[socket.id]
      sockets.splice(sockets.indexOf(socket), 1)
    })

  })

  // PUSH OVER
  repos.on('push', function (push) {
    console.log('push ' + push.repo + '/' + push.commit + ' (' + push.branch + ')'
    )
    sockets.forEach(function (socket) {
      socket.emit('pushed')
    })
    push.accept()
  })

  repos.on('fetch', function (fetch) {
    console.log('fetch ' + fetch.repo + '/' + fetch.commit)
    fetch.accept()
  })

  app.use('/git', function (req, res) {
    req.pause()
    repos.handle(req, res)
    req.resume()
  })

}
var turnOff = function () {
  if (server) {
    server.destroy()
    server = null
  }
  console.log('Server closed')
}

var checkStatus = function () {
  if (server) {
    return true
  }
  return false
}

module.exports = {
  turnOn: turnOn,
  turnOff: turnOff,
  checkStatus: checkStatus
}
