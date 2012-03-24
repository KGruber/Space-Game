var session = require("../models/session")

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		res.render("login")
	},
	
	create: function(req, res, next){
		session.login(req, req.body.email, req.body.password, function(err){
			if(err){
				res.render("login")
				return
			}
			
			res.redirect("/")
		});
	}
};