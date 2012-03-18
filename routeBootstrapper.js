var fs = require('fs')
var homeController = require('./controllers/homeController')

module.exports = function(app) {
	
	// app.get("/favicon.ico", function() {}); // Required if you delete the favicon.ico from public
	
	// Plural
	app.get("/:controller?", router);				        // Index
	app.get("/:controller.:format?", router);				// Index
	app.get("/:controller/:from-:to.:format?", router);		// Index
	
	// Plural Create & Delete
	app.post("/:controller", router);			// Create
	app.del("/:controller", router);   			// Delete all
	
	// Singular - different variable to clarify routing
	app.get("/:controller/:id.:format?", router);  	// To support controller/index	
	app.get("/:controller/:id/:action", router);		// Show edit
	app.put("/:controller/:id", router);				// Update
	app.del("/:controller/:id", router);				// Delete	
}

function router(req, res, next) {

	var controller = req.params.controller ? req.params.controller : '';
	var action = req.params.action ? req.params.action : '';
	var id = req.params.id ? req.params.id : ''
	var method = req.method.toLowerCase();
	var fn = 'index';
	
	// Default route
	if(controller.length == 0) {
		homeController.index(req, res, next);
		return;
	}		
	
	switch(method) {
		case 'get':
			if(action.length > 0) {
				fn = action;
			} else if(id.length > 0) {
				fn = 'show';
			}
			break;
		case 'post':
			fn = 'create';
			break;
		case 'put':
			fn = 'update';
			break;
		case 'delete':
			fn = 'destroy';
			break;		
	}
		
	try {
		var controllerLibrary = require('./controllers/' + controller.toLowerCase() + 'Controller');			
		if(typeof controllerLibrary[fn] === 'function') {
			controllerLibrary[fn](req,res,next);		
		} else {
			res.render('404');
		}	
	} catch (e) {
		res.render('404');
		throw(e)
	}
};