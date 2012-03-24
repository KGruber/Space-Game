var fs = require('fs')
	, express = require('express')
	, mongoose = require('mongoose')
	, nodepath = require('path')
	, coffeekup = require('coffeekup')
	, controllerBootstrapper = require('./controllerBootstrapper')
	, apiRequestBootstrapper = require('./apiRequestBootstrapper')
	, authenticationRequestWrapper = require('./authenticationRequestWrapper')

var path = __dirname;
var app;

/**
 * Initial bootstrapping
 */
exports.boot = function(params){
	
	//Create our express instance
	app = express.createServer();	

	// Import configuration
	require(path + '/configuration/configuration.js')(app,express);

	// Bootstrap application
	bootApplication(app);
	apiRequestBootstrapper.boot(app);
	controllerBootstrapper.boot(app);

	return app;
};

/**
 *  App settings and middleware
 *  Any of these can be added into the by environment configuration files to 
 *  enable modification by env.
 */

function bootApplication(app) {	 

	// Middleware
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: app.set('sessionKey') }));
	app.use(express.static(path + '/public'));  // Before router to enable dynamic routing
	app.use(authenticationRequestWrapper); // Befoew routwe to force authentication before controllers act
	app.use(app.router);

	// Example 500 page
	app['error'](function(err, req, res){
		console.log('Internal Server Error: ' + err.message);
		console.log(err.stack);
		res.render('500');
	});

	// Example 404 page via simple Connect middleware
	// app.use(function(req, res){
		// res.render('404');
	// });

	app.set('views', path + '/views');
	app.register('.coffee', require('coffeekup').adapters.express);
	app.set('view engine', 'coffee');

	// Some dynamic view helpers
	app.dynamicHelpers({

		request: function(req){
			return req;
		}
	});
}

// allow normal node loading if appropriate
if (!module.parent) {
	var port = process.env.PORT || 3000;
	exports.boot().listen(port);
	console.log("Express server %s in %s listening on port %d", express.version, app.settings.env, port)
}

// Generally a horrible idea...
process.on('uncaughtException', function (err) {
	console.log(err.stack);
});