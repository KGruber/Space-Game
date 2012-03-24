form action: '/login', method: 'post', ->
	div ->
		label for: 'Email', 'Email:'
		input id:'Email', name:'email', value:@email || ''
	div ->
		label for: 'Password', 'Password:'
		input type: 'password', id:'Password', name:'password'
	div ->
		button 'Log in'