var app = require('app')
var BrowserWindow = require('browser-window')
require('crash-reporter').start()

var mainWindow = null
var ipc = require('ipc')
var server = require('./server')

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html')

  mainWindow.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  ipc.on('turnOnServer', function (e) {
    console.log('requested turn on')
    server.turnOn()
    e.sender.send('serverTurnedOn')
  })

  ipc.on('turnOffServer', function (e) {
    console.log('requested turn off')
    server.turnOff()
    e.sender.send('serverTurnedOff')
  })

  ipc.on('checkServerStatus', function (e) {
    e.returnValue = server.checkStatus()
  })
})
