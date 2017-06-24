% set filetype=prolog

:-module(test, [do_the_thing/1]). 

do_the_thing([]):-write("I did a thing.\n").

