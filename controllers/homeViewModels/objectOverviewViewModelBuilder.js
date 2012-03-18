module.exports.build = function(req, callback){

	Remote.object.list({token: req.session.token}, function(err, data){
		if(err){
			callback("Error loading objects")
			return;
		}
		
		callback(null, data.objects);
	});
}