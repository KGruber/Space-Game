var http = require('http');

module.exports.boot = function (app){

	console.log("Loading service endpoint from " + app.set('spaceGameEndpoint'))

	//Create global Remote object so that it can be inited asynch
	Remote = {};

	var apiUrl = app.set('spaceGameEndpoint')
	var apiPort = app.set('spaceGamePort') || 80
	
	var options = {
		host: apiUrl,
		port: apiPort,
		path: '',
		method: 'GET'
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('  Successfully pulled down service endpoint');
			buildRequestModels(apiUrl, apiPort, JSON.parse(chunk));
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
}

var buildRequestModels = function (apiUrl, apiPort, services){

	//Init global Remote object
	for(var service in services)
	{
		var currentService = services[service]
		console.log("    Creating " + currentService.name + " service")
		
		Remote[currentService.name] = new Service(apiUrl, apiPort, currentService.name);
		for(var commandName in currentService)
		{
			if(commandName == "name")
				continue;
			
			var currentCommandName = commandName
			var currentCommand = currentService[currentCommandName]
			
			addServiceCommand(currentService.name, currentCommandName, currentCommand);
		}
	}
}

var addServiceCommand = function(currentServiceName, currentCommandName, currentCommand){
	
	console.log("      Creating " + currentServiceName + "." + currentCommandName)			
	//Example usage for token service: Remote.token.create(request, callback)
	Remote[currentServiceName][currentCommandName] = function(request, callback)
	{
		//Call the service's validate, then we can call the service
		var validationResult = this.validateRequest(request, currentCommand.request)
		if(validationResult.hasErrors)
		{
			callback("Valdidation Errors")
			return;
		}
		
		this.post(request, currentServiceName + '/' + currentCommandName, callback);
	}
}

//Holds individual Services
var Service = function(apiUrl, apiPort, name){

	this.url = apiUrl
	this.port = apiPort
	this.name = name;
}

Service.prototype.validateRequest = function(request, modelRequest){
	
	var result = { hasErrors : false, errors: new Array() }
	
	for(var fieldName in request)
	{
		var rules = request[fieldName]
		var field = modelRequest[fieldName]
		if(rules.required && !(field && field.length > 0))
		{
			result.errors.push(fieldName + " is required");
			result.hasErrors = true;
		}
	}
	
	return result;
}

Service.prototype.post = function(serviceRequest, command, callback){
	
	var options = {
		host: this.url,
		port: this.port,
		path: "/" + command,
		method: 'POST',
		headers: {'content-type' : 'application/json'}
	};
	
	console.log([command, serviceRequest])

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		if(res.statusCode != 200)
		{
			callback("Error making service request, service returned " + res.statusCode)
			return;
		}
		
		res.on('data', function (data) {
			data = JSON.parse(data);
		
			if(data.success)
				callback(null, data);
			else
				callback(condenseErrors(data.error), data);
		});
	});
	
	req.write(JSON.stringify(serviceRequest));
	req.end();
}

var condenseErrors = function(error){
	if(typeof error == 'string')
		return error;
	
	for(var err in error)
		return condenseErrors(error[err])
}