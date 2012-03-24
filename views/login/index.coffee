h1 -> 'Login'
div @error if @error?
partial 'loginForm'
p -> 
	text 'Don\'t have an account? '
	a href: '/account', -> 'Create one'
