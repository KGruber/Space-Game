module.exports.createAccount = function(name, email, password, callback){

	Remote.player.create({name: name, email: email, password: password}, function(err){
		if(err)
			callback(err)
		else
			callback();
	});
}