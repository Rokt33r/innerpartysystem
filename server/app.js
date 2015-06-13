var express = require('express')

var app = express()
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

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

app.listen(8080)
