
module.exports.update = function (req, email, token){

	req.session.email = email;
	req.session.token = token;
	req.session.tokenExpires = now

	var now = new Date()
	now.setMinutes(now.getMinutes() + 15)
}