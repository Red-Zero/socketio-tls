#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./koa/app');

var https = require('https');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);



const path = require('path');
const fs = require('fs');

// Certificate(s) & Key(s)
const serverOptions = {
	cert: fs.readFileSync(path.join(__dirname,
     '/serverkey/cert.pem')),
	key: fs.readFileSync(path.join(__dirname,
     '/serverkey/key.pem')),
  ca: [
    fs.readFileSync(path.join(__dirname, 
      '/clientkey/cert.pem')),
  ],
	// TLS Versions
	maxVersion: 'TLSv1.3',
	minVersion: 'TLSv1.2'
}
/**
 * Create HTTP server.
 */

var server = https.createServer(serverOptions,app.callback());


const io = require('socket.io')(server);
io.on("connection", (socket) => {
    console.log("ok")
  // 从客户端接收消息
  socket.on("hello from server", (...args) => {
    // ...
    console.log("server:",args)
    // 向客户端发送消息
  socket.emit("hello from server","server msg");
  });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
  console.log(process.env.NODE_ENV);
}

exports.app = app;
exports.server = server;