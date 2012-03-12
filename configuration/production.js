module.exports = function(app,express) {
		
	app.set('db-uri', process.env.MONGOHQ_URL);
    app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
	
}
