% set filetype=prolog

addOp('+').
subOp('-').
mulOp('*').
divOp('/').

q(S, X):-string(S), !, atom_chars(S, X).
q([], []).    
q(S, X):-is_list(S), !, X is S.

t([], []).        
t(S, R):-
    string(S),
    !,
    atom_chars(S, S_), 
    t(S_, R).     
t([H|T], R):-t(T,[H|R]).
    
    
lex([], []).
lex([' '|T], R):-lex(T, R).
lex(['\n'|T], R):-lex(T, R).
lex(['\t'|T], R):-lex(T, R).    
lex([H|T], R):-
    atom_number(H, X),
    lex(T, R_),
    R is [X|R_].

lex([H|T], R):-
    lex(T, R_),
    R is [H|R_]. 


expr([X, Op, Y], R):-
    integer(X),
    integer(Y),
    addOp(Op),
    R is X + Y.

expr([X, Op, Y], R):-
    integer(X),
    integer(Y),
    subOp(Op),
    R is X - Y.

expr([X, Op, Y], R):-    
    integer(X),
    integer(Y),
    mulOp(Op),
    R is X * Y.

expr([X, Op, Y], R):-
    integer(X),
    integer(Y),
    divOp(Op),
    R is X / Y.

    
expr([X, Op | Y], R):-
    integer(X),
    compound(Y),
    expr(Y, Z),
    expr([X, Op, Z], R).

