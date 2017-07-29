#!/bin/bash

# Restart networking
/etc/init.d/networking restart

# Start node server
npm start
