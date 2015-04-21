var Estacion;
exports.setModel = function(modelo){
	Estacion = modelo;
};
exports.index = function(req, res){
	Estacion.find({}, function(error, estacions){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('estacions/index', {
				estacions: estacions
			});
		}
	})
};
exports.create = function(req, res){
	res.render('estacions/save', {
		put: false,
		action: '/estacions/',
		estacion: new Estacion({
			nombre: '',
			url: '',
			descripcion: ''
		})
	});
};
exports.store = function(req, res){
	var estacion = new Estacion({
		nombre: req.body.nombre,
		url: req.body.url,
		descripcion: req.body.descripcion
	});
	estacion.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar la estación.');
		}else{	
			res.redirect('/estacions');
		}
	});
};
exports.show = function(req, res){
	Estacion.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver la estación.');
		}else{
			res.render('estacions/show', {
				estacion: documento
			});
		}
	});
};
exports.edit = function(req, res){
	Estacion.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver la estación.');
		}else{
			res.render('estacions/save', {
				put: true,
				action: '/estacions/' + req.params.id,
				estacion: documento
			});
		}
	});
};
exports.update = function(req, res){
	Estacion.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar la estación.');
		}else{
			var estacion = documento;
			estacion.nombre = req.body.nombre;
			estacion.url = req.body.url;
			estacion.descripcion = req.body.descripcion;
			estacion.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar la estación.');
				}else{	
					res.redirect('/estacions');
				}
			});
		}
	});
};
exports.destroy = function(req, res){
	Estacion.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el estación.');
		}else{	
			res.redirect('/estacions');
		}
	});
};
