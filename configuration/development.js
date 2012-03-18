module.exports = function(app,express) {
		
	app.set('db-uri', 'mongodb://localhost/mvc-development');	       
	app.set('spaceGameEndpoint', "localhost")
	app.set('spaceGamePort', "3001")
	app.set('sessionKey', "SuperSecretDevKey")
	
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
