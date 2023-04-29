const app = require('express')();
//const server = require('http').createServer(app);


const path = require('path');
const fs = require('fs');

const serverOptions = {
	// Certificate(s) & Key(s)
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

console.log(serverOptions)
const server = require('https').
createServer(serverOptions,app);

const io = require('socket.io')(server);
app.get('/api', (req, res) => {
  res.send('Hello World!')
})
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


server.listen(3000,()=>{
  console.log('listen 3000')
})

