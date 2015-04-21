var nicks = new Array();
var io;
exports.iniciar = function(http){
	io = require('socket.io').listen(http);
	io.sockets.on('connection', function(socket){
		usuarios(socket);
		nick(socket);
		mensaje(socket);
		usuario_desconectado(socket);		
	});
}
function usuarios(socket){
	socket.emit('usuarios', {nicks: nicks});
	socket.broadcast.emit('usuarios', {nicks: nicks});
}
function nick(socket){
	socket.on('nick', function(data){
		var nick = data.nick;
		if(nicks.indexOf(nick) == -1){
			nicks.push(nick);
			socket.nick = nick;
			socket.emit('nick', {correcto: true, nick: nick});
			socket.broadcast.emit('nuevo_usuario', {nick: nick});
			usuarios(socket);
		}else{
			socket.emit('nick', {correcto: false, nick: nick});
		}
	})
}
function mensaje(socket){
	socket.on('mensaje', function(data){
		if(socket.nick){
			var mensaje = data.mensaje;
			var nick = socket.nick;
			socket.broadcast.emit('mensaje', {mensaje: mensaje, nick: nick});
		}
	});
}
function usuario_desconectado(socket){
	socket.on('disconnect', function(){
		if(socket.nick){
			nicks.splice(nicks.indexOf(socket.nick), 1);
			socket.broadcast.emit('disconnect', {nick: socket.nick});
			usuarios(socket);
		}
	});
}