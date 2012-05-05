var fs = require('fs')

var path = __dirname;

module.exports.boot = function(app){
	require(path + '/routeBootstrapper')(app);
	
	fs.readdir(path + '/controllers', function(err, files){
		if (err) throw err;
		files.forEach(function(file){    	
			bootController(app, file);
		});
	});
};

function bootController(app, file) {
	var name = file.replace('.js', ''),
    	controller = path + '/controllers/' + name,
    	template = name.replace('Controller','').toLowerCase();
}