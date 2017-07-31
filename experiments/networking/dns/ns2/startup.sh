#!/bin/bash

# Check bind configuration
named-checkconf

# Restart bind9
service bind9 restart

# Restart networking
service networking restart

# Run app
npm run start
