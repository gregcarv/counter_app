const getIp = require('./getIP.js')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

/**
 * Console logs the url the server listening on
 * 
 * @param {address} ip 
 * @param {number} port 
 */
function serverListeningOnMsg(ip, port){
  console.log( `listening on: http://${ip}:${port}`)
}

/**
 * Return an incremented or decremented count
 * 
 * @param {string} direction (accepts 'increment' or 'decrement')
 * @param {int} currentCount (accepts a whole number)
 */
function returnCount(direction, currentCount) {
  if (direction === 'increment') {
    return ++currentCount
  }
  return --currentCount
}

/**
 * This is to test realtime incrementation from the server
 * 
 * @param {number} incrementTo (accepts any whole number)
 * @param {object} socket (the socket instance must be passed for the emit to work)
 */
function runAutomatedCounterUpdate(incrementTo = 15, socket) {
  const orders = incrementTo
  let i = 0

  const theInterval = setInterval(function () {
    socket.emit('countUpdated', i++)

    if (i > orders) {
      clearInterval(theInterval)
    }
  }, 1000)
}

/**
 * Initialize the server
 */
async function init() {
  const app = express()
  const server = http.createServer(app)
  const io = socketio(server)

  const port = process.env.PORT || 3000
  const ip = getIp.theIp() ? getIp.theIp() : '127.0.0.1';
  const publicDir = path.join(__dirname, '../public')

  app.use(express.static(publicDir))

  io.on('connection', (socket) => {
    console.log('Websocket connected')
    socket.emit('startCount', 0)

    socket.on('updateCount', (data) => {
      const [direction, currentCount] = data
      const count = returnCount(direction, currentCount)
      console.log(`Request: update count from ${currentCount} to ${count}`)
      socket.emit('countUpdated', count)
    })

    // This is to test realtime incrementation from the server
    // runAutomatedCounterUpdate(25, socket); 
  })

  server.listen(port, ip, serverListeningOnMsg(ip, port))
}

init();

module.exports = {
  init,
  runAutomatedCounterUpdate,
  returnCount
}