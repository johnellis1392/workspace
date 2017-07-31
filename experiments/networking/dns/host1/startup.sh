#!/bin/bash

# Restart networking
# ifdown eth0 && ifup eth0
service networking restart

# Test forward lookup
nslookup host1

# Test reverse lookup
nslookup 10.1.100.90

# Query ns1 using DIG
dig homelab.local any @ns1.homelab.local

# Query ns2 using DIG
dig homelab.local any @ns2.homelab.local

# Curl various url's
# curl ns1.homelab.local
# curl ns2.homelab.local
# curl example.homelab.local

# Start server
npm run start
