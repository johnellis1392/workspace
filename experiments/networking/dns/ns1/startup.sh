#!/bin/bash

# Restart networking
/etc/init.d/networking restart

# Start node server
cd ${SRC_DIR} && npm start
