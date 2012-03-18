var account = require('../models/account/account')
var session = require('../models/session')

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		res.render('account')
	},
	
	show: function(req, res, next) {	  		  
		res.render('account/show')
	},
	
	update: function(req, res, next){
		res.render('account/update')
	},
	  
	create: function(req, res, next){
		account.createAccount(req.body.name, req.body.email, req.body.password, function(err){
			if(err)
			{
				console.log(err)
				res.render('account', {error: err, name: req.body.name, email: req.body.email, password: req.body.password})
				return;
			}

			account.login(req.body.email, req.body.password, function(err, token){
				if(err){
					console.log(err)
					res.render('account', {error: 'Unable to log in'});
					return;
				}
				
				session.update(req, req.body.email, token)
				
				res.redirect('/')
			});
		})
	}
};