var express = require('express')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var enableDestroy = require('server-destroy')
var server = null

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
  console.log('server ready!!')
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
