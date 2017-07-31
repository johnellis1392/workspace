#!/bin/bash

# Check bind configurations
named-checkconf
named-checkzone homelab.local /etc/bind/zones/db.homelab.local
named-checkzone 100.1.10.in-addr.arpa /etc/bind/zones/db.10.1.100

# Restart BIND service
service bind9 restart

# Restart networking
service networking restart

# Start node server
npm start
