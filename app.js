
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var estacions = require('./routes/estacions');
var resenas = require('./routes/resenas');
var chat = require('./routes/chat_servidor');

mongoose.connect('mongodb://localhost/primer_base', function(error){
	if(error){
		throw error;		
	}else{
		console.log('Conectado a MongoDB');
	}
});
var EstacionSchema = mongoose.Schema({
	nombre: {type: String, required: true},
	url: {type: String, required: true},
	descripcion: {type: String, required: true}
});
var EstacionModel = mongoose.model('Estacion', EstacionSchema);
estacions.setModel(EstacionModel);

var ResenaSchema = mongoose.Schema({
	usuario: {type: String, required: true},
	resena: {type: String, required: true}
});
var ResenaModel = mongoose.model('Resena', ResenaSchema);
resenas.setModel(ResenaModel);

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/chat', function(res, res){
	res.render('chat');
});

app.get('/estacions', estacions.index);
app.get('/estacions/create', estacions.create);
app.post('/estacions', estacions.store);
app.get('/estacions/:id', estacions.show);
app.get('/estacions/:id/edit', estacions.edit);
app.put('/estacions/:id', estacions.update);
app.delete('/estacions/:id', estacions.destroy);

app.get('/resenas', resenas.index);
app.get('/resenas/create', resenas.create);
app.post('/resenas', resenas.store);
app.get('/resenas/:id', resenas.show);
app.get('/resenas/:id/edit',resenas.edit);
app.put('/resenas/:id', resenas.update);
app.delete('/resenas/:id', resenas.destroy);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

chat.iniciar(server);