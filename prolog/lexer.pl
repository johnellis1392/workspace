% set filetype=prolog

% Declare module name to export 
:-module(lexer, [
  test_method/1
]).

test_method([]):-write("Hello, World!\n").

