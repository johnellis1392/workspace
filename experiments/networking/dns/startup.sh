#!/bin/bash

# Start bind service
service bind9 start

# Reload network interfaces to load /etc/network/interfaces configs
# ip addr flush dev lo
# ip addr flush dev eth0
# ifdown -a
# ifup -a
# service networking restart

# Reload nameserver
# rndc reload

# Check dns zones
# named-checkzone example.com /etc/bind/db.example.com
# named-checkzone 127.0.0.1 /etc/bind/db.127
# named-checkzone 192.168.1 /etc/bind/db.192

# NOTE The above is the same as running this:
# /etc/init.d/bind9 start

# /bin/bash
npm start
