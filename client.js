// const socket = require("socket.io-client")("ws://localhost:3000");

// // 向服务器发送消息
// socket.emit("hello from server", "client msg");

// // 从服务器接收消息
// socket.on("hello from server", (...args) => {
//   // ...
//   console.log(args)
// });


const path = require('path');
const fs = require('fs');

const socket = require("socket.io-client")("https://localhost:3000",{

  ca: fs.readFileSync(path.join(__dirname, '/serverkey/cert.pem')),
  //cert: fs.readFileSync(path.join(__dirname, '/clientkey/cert.pem')),
  //key: fs.readFileSync(path.join(__dirname, '/clientkey/key.pem')),
  extraHeaders:{
    'x-token':'1232'
  }
});


// 向服务器发送消息
socket.emit("hello from server", "client msg");

// 从服务器接收消息
socket.on("hello from server", (...args) => {
  // ...
  console.log(args)
});
socket.on("connect_error", (err) => {
  // revert to classic upgrade
console.log(err)
});