var async = require('async')
var loggedInUserViewModelBuilder = require('../sharedViewModels/loggedInUserViewModelBuilder')
var objectOverviewViewModelBuilder = require('./objectOverviewViewModelBuilder')

module.exports.build = function(req, callback){

	async.parallel({
		objects : function(asynchCallback){ objectOverviewViewModelBuilder.build(req, asynchCallback) },
		player : function(asynchCallback){ loggedInUserViewModelBuilder.build(req, asynchCallback) }
	}, callback);
};
