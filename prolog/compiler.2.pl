% set filetype=prolog


/**
 * This needs a way to store variables and named values. I need
 * to find some way of storing data in prolog. 
 */

/**
 * So representing types and data should be easy. Technically, a type 
 * expression is just some number of traits paired with a type 
 * declaration, which can be represented as a string. For Example: 
 * 
 * Assignment: [Name, Body] // Where typeOf([Name, Body], Type):-typeOf(Body, Type). 
 * Addition: ['Number', X, Y] // Where typeOf(['Number', _, _], 'Number').
 * Block: [Expr | Body] // Where typeOf([Expr | []], Type):-typeOf(Expr, Type).
 * 						   And typeOf([Expr | Body], Type):-typeOf(Body, Type).
 * 
 * There needs to be some uniform representation method for each semantic 
 * element. So have an expression type, a semantic type, and some number 
 * of defining arguments, where an expression type can be a Literal, Expression,
 * Assignment, etc, and the semantic type can be an Integer, Double, Boolean, etc. 
 * So one example of a possible form is:
 * 
 * Assignment: ['Assign', Type, Name, Body] 
 * If: ['If', Type, Predicate, Then] || ['If', Type, Predicate, Then, Else] 
 */


/**
 * List of valid lexical tokens:
 * 
 * operators: +, -, *, /, =, ; 
 * identifiers: "[a-zA-Z][a-zA-Z0-9]"
 * number: "[0-9]" 
 */

:-module(parser, []).

% Add directory to search path. test becomes the
% name attached to the directory, and the string
% is the name of the directory to search. 
user:file_search_path(test, "test"). 
:-use_module(lexer).

% Retrieve the test module from the test() lib 
:-use_module(test(test)). 

/**
 * First attempt at making a dictionary type.
 */
dict_create([]).
 
is_dict([]).
is_dict([[X, _] | T]):-string(X), is_dict(T).

dict_add(X, Y, Dict, [[X, Y] | Dict]):-is_dict(Dict). 
	
dict_get(_, [], '').
dict_get(X, [[X, Value], _], Value):-!.
dict_get(X, [_, Tail], Result):-!, dict_get(X, Tail, Result).

dict_set(_, _, [], []).
dict_set(X, Y, [[X, _] | Tail], [[X, Y], Tail]):-!.
dict_set(X, Y, [H | T], [H | Result]):-!, dict_set(X, Y, T, Result). 
	
dict_remove(_, [], []).
dict_remove(X, [[X, _] | Tail], Tail):-!.
dict_remove(X, [Head | Tail], [Head | Result]):-!, dict_remove(X, Tail, Result). 
 

opExpr(X, "+", Y, R):-R is X + Y. 
opExpr(X, "-", Y, R):-R is X - Y. 
opExpr(X, "*", Y, R):-R is X * Y. 
opExpr(X, "/", Y, R):-R is X / Y. 

/**
 * Assuming match is some regex-matching function. 
 * Match an identifier. 
 */
%ident(X):-match(X, '[_a-zA-Z][_a-zA-Z0-9]*'). 

/**
 * Match a numeric literal 
 */
expr(X, R):-atom_number(X, R). 

/**
 * Match a string
 */
expr(["'", X, "'" | Y], Result):-string(X), expr(Y, Result). 

/**
 * Match a mathematical expression. 
 */
expr([X, Op | Y], R):-
	expr(X, X2),
	expr(Y, Y2),
	opExpr(X2, Op, Y2, R). 

/**
 * Assignment Statement 
 */
%expr([X, '=', Y, ';' | T], R):-ident(X), expr(Y, V),
	

% Function call outside prolog interpreter
% Can use either ?- or :- 
:-lexer:test_method([]).
:-test:do_the_thing([]). 
:-halt.

