const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const five = require("johnny-five")
const board = new five.Board({
  port: 'COM6',
  repl: false,
  debug: false
})

io.on('connection',(socket)=>{
	console.log('Alguien se conecto')
})

app.get('/', (req,res)=>{
	res.sendfile(__dirname+'/index.html')
})

server.listen(8000,()=>{
	console.log('Servidor arrancando')
})


board.on("ready", ()=> {
  let lm35 = new five.Thermometer({
  	controller: 'lm35',
  	pin: 'A0',
  	freq: 1000	
  })
  	
  lm35.on('data',function(){
  	io.sockets.emit('lectura','La temperatura es: ' + this.C)
  })	
})