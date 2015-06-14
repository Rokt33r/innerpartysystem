var app = require('app')
var BrowserWindow = require('browser-window')
require('crash-reporter').start()

var mainWindow = null
var ipc = require('ipc')
var server = require('./server')
var cp = require('child_process')

var fs = require('fs')

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

  // FILE WATCHER & GIT CONTROL
  var status = {}
  status.watcher = null
  status.filename = ''
  status.host = ''

  ipc.on('updateHost', function (e, host) {
    status.host = host
    console.log('host updated!',status.host)
  })

  ipc.on('watchFile', function (e, filename) {
    status.filename = filename
    cp.exec('git init', {cwd: status.filename}, function (err, stdout, stderr) {
      console.log(stdout.toString('utf-8'))
      cp.exec('git pull http://' + status.host + ':8080/git/index master', function (err, stdout, stderr) {
        console.log(stdout.toString('utf-8'))

        if (status.watcher) status.watcher.close()
        status.watcher = fs.watch(status.filename, { persistent: true, recursive: false },
          function (e, file) {
            console.log('CHANGED :', file)
            cp.exec('git add -A', {cwd: status.filename}, function (err, stdout, stderr) {
              console.log(stdout.toString('utf-8'))
              cp.exec('git commit -a -m yolo', {cwd: status.filename}, function (err, stdout, stderr) {
                console.log(stdout.toString('utf-8'))
                cp.exec('git push http://' + status.host + ':8080/git/index master', {cwd: status.filename}, function (err, stdout, stderr) {
                  console.log(stdout.toString('utf-8'))
                })
              })
            })
        })
      })
    })
  })

  ipc.on('requestPull', function () {
    cp.exec('git pull http://' + status.host + ':8080/git/index', {cwd: status.filename}, function (err, stdout, stderr) {
      console.log(stdout.toString('utf-8'))
      console.log('ERR:', stderr.toString('utf-8'))
    })
  })

  // WIFI STATUS
  ipc.on('requestCurrentWifiName', function (e) {
    cp.exec('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I | grep -e "\\bSSID:" | sed -e "s/^.*SSID: //"', function (err, stdout, stderr) {
      e.returnValue = stdout.toString('utf-8')
    })
  })

  ipc.on('requestCurrentIp', function (e) {
    cp.exec('ifconfig en0 | sed -nEe $"s/^[ \t]+inet[ \t]+([0-9.]+).*$/\\1/p"', function (err, stdout, stderr) {
      e.returnValue = stdout.toString('utf-8')
    })
  })
})
