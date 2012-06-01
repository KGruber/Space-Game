var express = require('express'),
	controllerBootstrapper = require('./controllerBootstrapper'),
	apiRequestBootstrapper = require('./apiRequestBootstrapper'),
	authenticationRequestWrapper = require('./authenticationRequestWrapper');

var path = __dirname;

var boot = function(){
    var app = express.createServer();	
    
    importConfigurationSettings(app);
    initializeMiddleware(app);
    initializeViewEngine(app);
    addErrorHandling(app);
    apiRequestBootstrapper.boot(app);
    startListening(app);
};

var importConfigurationSettings = function(app){
    require(path + '/configuration/configuration.js')(app, express);
};

var initializeViewEngine = function (app){
    app.set('views', path + '/views');
    app.register('.coffee', require('coffeekup').adapters.express);
    app.set('view engine', 'coffee');
};

var initializeMiddleware = function (app) {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: app.set('sessionKey') }));
    app.use(express.static(path + '/public'));  // Before router to enable dynamic routing
    app.use(authenticationRequestWrapper); // Before route to force authentication before controllers act
    app.use(app.router);
};

var addErrorHandling = function (app){
    app.error(function(err, req, res){
        console.log('Internal Server Error: ' + err.message);
        console.log(err.stack);
        res.render('500');
    });
	// app.use(function(req, res){
		// res.render('404');
	// });
    
    // Generally a horrible idea...
    process.on('uncaughtException', function (err) {
        console.log(err.stack);
    });
};

var startListening = function(app){
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log("Express server %s in %s listening on port %d", express.version, app.settings.env, port);
};

boot();