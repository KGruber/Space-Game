var account = require('../models/account/account')
var session = require('../models/session')

module.exports = {

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
				res.render('account', {error: err, name: req.body.name, email: req.body.email, password: req.body.password})
				return;
			}

			session.login(req, req.body.email, req.body.password, function(err, token){
				if(err){
					res.render('account', {error: 'Unable to log in'});
					return;
				}
				
				res.redirect('/')
			});
		})
	}
};