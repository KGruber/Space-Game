var account = require("../models/account/account")
var session = require("../models/session")

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		if(req.loggedIn)
			renderLoggedInView(req, res);
		else
			res.render('home/anonymous')
	}
};

var renderLoggedInView = function(req, res)
{
	res.render('home/loggedIn', homeViewModelBuilder.build(req))
}