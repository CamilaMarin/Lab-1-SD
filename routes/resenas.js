var Resena;
exports.setModel = function(modelo){
	Resena = modelo;
};
exports.index = function(req, res){
	Resena.find({}, function(error, resenas){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('resenas/index', {
				resenas: resenas
			});
		}
	})
};
exports.create = function(req, res){
	res.render('resenas/save', {
		put: false,
		action: '/resenas/',
		resena: new Resena({
			usuario: '',
			resena: ''
		})
	});
};
exports.store = function(req, res){
	var resena = new Resena({
		usuario: req.body.usuario,
		resena: req.body.resena
	});
	resena.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar la reseña.');
		}else{	
			res.redirect('/resenas');
		}
	});
};
exports.show = function(req, res){
	Resena.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver la reseña.');
		}else{
			res.render('resenas/show', {
				resena: documento
			});
		}
	});
};
exports.edit = function(req, res){
	Resena.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver la reseña.');
		}else{
			res.render('resenas/save', {
				put: true,
				action: '/resenas/' + req.params.id,
				resena: documento
			});
		}
	});
};
exports.update = function(req, res){
	Resena.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar la reseña.');
		}else{
			var resena = documento;
			resena.usuario = req.body.usuario;
			resena.resena = req.body.resena;
			resena.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar la reseña.');
				}else{	
					res.redirect('/resenas');
				}
			});
		}
	});
};
exports.destroy = function(req, res){
	Resena.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el reseña.');
		}else{	
			res.redirect('/resenas');
		}
	});
};
