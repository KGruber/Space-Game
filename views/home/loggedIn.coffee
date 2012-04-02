h2 -> 'Overview'
div @error if @error
ul ->
	for i in @objects
		li i.name 
		ul ->
			for x in i.facilities
				li x.name