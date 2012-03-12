
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
		res.render('account/create')
	},
};