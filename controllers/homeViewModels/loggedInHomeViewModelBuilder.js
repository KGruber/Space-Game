var loggedInUserViewModelBuilder = require('../sharedViewModels/loggedInUserViewModelBuilder')

module.exports.build = function(req){
	return {
		player: loggedInUserViewModelBuilder.build(req)
	}
}