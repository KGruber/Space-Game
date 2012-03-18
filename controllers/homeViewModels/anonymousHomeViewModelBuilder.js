var anonymousUserViewModelBuilder = require('../sharedViewModels/anonymousUserViewModelBuilder')

module.exports.build = function(req){
	return {
		player: anonymousUserViewModelBuilder.build(req)
	}
}