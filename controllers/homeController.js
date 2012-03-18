var account = require("../models/account/account")
var session = require("../models/session")

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		if(req.isLoggedIn)
			renderLoggedInView(req, res);
		else
			res.render('home/anonymous')
	}
};

var renderLoggedInView = function(req, res){
	var loggedInHomeViewModelBuilder = require("./homeViewModels/loggedInHomeViewModelBuilder");

	res.render('home/loggedIn', loggedInHomeViewModelBuilder.build(req));
}