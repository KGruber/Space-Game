doctype 5
html ->
  head ->
    meta charset: 'utf-8'
	title "#{@title or 'Space Game'}"
	#link rel: 'stylesheet', href: '/css/app.css'
	script src: '/js/jquery.js'
	#script src: '/js/less.js'

body ->
	@body