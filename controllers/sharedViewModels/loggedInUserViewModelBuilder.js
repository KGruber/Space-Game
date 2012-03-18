module.exports.build = function(req){
	return {
		isLoggedIn: req.isLoggedIn
	}
}