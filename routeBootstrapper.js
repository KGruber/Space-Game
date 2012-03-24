var fs = require('fs')
var homeController = require('./controllers/homeController')

module.exports = function(app) {

	app.get("/:controller?", router);			// Index

	app.post("/:controller", router);			// Create
	app.del("/:controller", router);			// Delete all
	
	app.get("/:controller/:action?/:id", router);		// Show edit
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
		var controller = require('./controllers/' + controller.toLowerCase() + 'Controller');			
		if(typeof controller[fn] === 'function') {
			controller[fn](req,res,next);		
		} else {
			res.render('404');
		}	
	} catch (e) {
		res.render('404');
		throw(e)
	}
};