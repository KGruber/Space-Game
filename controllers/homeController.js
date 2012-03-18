var account = require("../models/account/account")
var session = require("../models/session")
var loggedInHomeViewModelBuilder = require("./homeViewModels/loggedInHomeViewModelBuilder");

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
	loggedInHomeViewModelBuilder.build(req, function(err, viewmodel){
		if(err){
			res.render('home/loggedIn', {error : err});
			return;
		}

		res.render('home/loggedIn', viewmodel);
	})
}