var socket = io.connect('http://localhost:8080');
//Recibe los usuarios conectados.
socket.on('usuarios', function(data){
	var nicks = data.nicks;
	$("#usuarios").html('');
	for(var i = 0; i < nicks.length; i++){
		$("#usuarios").append('<li>' + nicks[i] + '</li>');
	}
});
//Envía el nick para registrarse en el chat.
$("#form_nick [type='submit']").click(function(){
	var nick = $("#nick").val();
	socket.emit('nick', {nick: nick});
});
//Recibe una respuesta de si existe o no el nick.
socket.on('nick', function(data){
	if(data.correcto){
		$("#mensajes").append('<p style="color: #00f"> Bienvenido/a '+data.nick+' </p>').scrollTop($("#mensajes").height());
		$("#form_nick").hide();
		$("#mensajes,#form_mensaje").show();
	}else{
		alert('Ya existe un usuario con el nombre ' + data.nick);
	}
});
//Escucha cada vez que un nuevo usuario se conecte al chat.
socket.on('nuevo_usuario', function(data){
	$("#mensajes").append('<p style="color: #00f"> '+data.nick+' se ha conectado </p>').scrollTop($("#mensajes").height());
})
//Envía un mensaje al servidor.
$("#form_mensaje [type='submit']").click(function(){
	var mensaje = $("#mensaje").val();
	socket.emit('mensaje', {mensaje: mensaje});
	$("#mensajes").append('<p style="font-weight: bold;"> tu: '+mensaje+' </p>').scrollTop($("#mensajes").height());
	$("#mensaje").val('');
});
//Espera los mensajes nuevos del servidor.
socket.on('mensaje', function(data){
	$("#mensajes").append('<p> '+data.nick+': '+data.mensaje+' </p>').scrollTop($("#mensajes").height());
});
//Evento que se dispara cada vez un usuario se desconecta.
socket.on('disconnect', function(data){
	$("#mensajes").append('<p style="color: #f00"> '+data.nick+' se ha desconectado </p>').scrollTop($("#mensajes").height());
});