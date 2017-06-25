{application, 'hello_world', [
	{description, "New project"},
	{vsn, "0.1.0"},
	{modules, ['hello_handler','hello_world_app','hello_world_sup']},
	{registered, [hello_world_sup]},
	{applications, [kernel,stdlib,cowboy]},
	{mod, {hello_world_app, []}},
	{env, []}
]}.