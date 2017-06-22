#!/bin/bash

# This command defines a cli hook for executing either
# pre or post command.

# Function to be called on command given
invoke_hook() {

    # $COMP_LINE will be empty if this command is being run
    # because of tab-completion, so return in this case.
    [ -n "$COMP_LINE" ] && return

    # $BASH_COMMAND is the current command.
    # $PROMPT_COMMAND is the name of the post-execution command name.
    # This statement will return if the current command is the
    # post-exec hook, so it only executes before the given command.
    [ "$BASH_COMMAND" == "$PROMPT_COMMAND" ] && return

    # Get the last command from the shell history
    local command = $(history 1 | sed -e "s/^[ ]*[0-9]*[ ]*//g");

    # Execute "hook" function on command
    hook "$command";
}

# The `trap` command creates a hook from a function for the given
# hook point. DEBUG is meant to be run for every command, EXIT
# is run on shell exit, and a number of other signals such as
# SIGINT can be specified for this command.
#
# `trap -l` lists all possible Signals
# `trap -p` (with no args) lists all the active trap hooks
trap "invoke_hook" DEBUG;
