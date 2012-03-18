module.exports.createAccount = function(name, email, password, callback){

	Remote.player.create({name: name, email: email, password: password}, function(err){
		if(err)
			callback(err)
		else
			callback();
	});
}


module.exports.login = function(email, password, callback){
	Remote.token.create({email: email, password: password}, function(err){
		if(err)
			callback(err)
		else
			callback();
	});
}