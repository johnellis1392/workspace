#!/bin/bash

# File for starting a new erlang project
# NOTE: the steps for this file are taken from
# https://ninenines.eu/docs/en/cowboy/1.0/guide/getting_started/

# Get erlang.mk
wget https://raw.githubusercontent.com/ninenines/erlang.mk/master/erlang.mk

# Make a new project
# This creates a makefile for the new project
make -f erlang.mk bootstrap bootstrap-rel

# Build new project
make

# Run console in new project (where project name is hello_world)
./_rel/hello_world_release/bin/hello_world_release console

# When in the console run `i().` to see a list of running processes
# in the beam vm
#
# hello_world_sup is the supervisor process for the application.
# You will also need to add cowboy as a dependency to the produced
# Makefile by modifying the line `DEPS = ...`
# And add `cowboy` to the list of "applications"
# in the ebin/hello_world.app configuration

# Launch the application in foreground
./_rel/hello_world_release/bin/hello_world_release foreground

# Make a new handler from cowboy handler template
make new t=cowboy_http n=hello_handler

# Ping the new endpoint!
curl localhost:8080
