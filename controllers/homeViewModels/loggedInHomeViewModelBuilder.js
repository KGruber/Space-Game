var async = require('async')
var loggedInUserViewModelBuilder = require('../sharedViewModels/loggedInUserViewModelBuilder')
var objectOverviewViewModelBuilder = require('./objectOverviewViewModelBuilder')

module.exports.build = function(req, callback){

	async.parallel({
		objects : function(asyncCallback){ objectOverviewViewModelBuilder.build(req, asyncCallback) },
		player : function(asyncCallback){ loggedInUserViewModelBuilder.build(req, asyncCallback) }
	}, callback);
};
