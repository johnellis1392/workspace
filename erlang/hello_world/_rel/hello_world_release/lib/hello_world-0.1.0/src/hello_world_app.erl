-module(hello_world_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
	% Create a router for dispatching requests
	Dispatch = cowboy_router:compile([
		{'_', [{"/", hello_handler, []}]}
	]),
	% Start cowboy http server
	cowboy:start_http(my_http_listener, 100, [{port, 8080}],
		[{env, [{dispatch, Dispatch}]}]
	),
	hello_world_sup:start_link().

stop(_State) ->
	ok.
