#!/usr/bin/env bash

# NOTES:
# * A Certificate Signing Request (CSR) contains the public key
#   that is used to generate certificates, and some additional metadata.
# * You should put the Fully-Qualified Domain Name (FQDN) of the site
#   you're planning on making in the CSR prompt.
# * Certificates and CSR files are encoded in PEM format

# Option 1:
# The following combination works; can connect with browser
openssl -new -newkey rsa:2048 -nodes -out server.csr -keyout server.key
openssl x509 -signkey server.key -in server.csr -req -days 365 -out server.crt

# Option 2:
# Also works
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -signkey server.key -out server.crt


# Additional Notes:

# Generate Certificate Signing Request and new Private Key file:
# * `-nodes` is used to specify the private key shouldn't
#   be encrypted with a passphrase.
# openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key

# Generate CSR from existing private key:
# openssl req -key private.key -new -out domain.csr

# Generate new Private Key
# openssl req -newkey rsa:2048 -keyout private.key

# Generate CSR from existing Certificate and Private Key
# * `-x509toreq` Sepcifies that we're using an x509 certificate to
#   make the CSR
# openssl x509 -in domain.crt -signkey domain.key -x509toreq -out domain.csr

# Generate a new Self-Signed Certificate
# * `-x509` Tell req to generate a new self-signed certificate
# * `-days 365` sets the certificate to expire after 365 days
# openssl req -newkey rsa:2048 -nodes -keyout domain.key -x509 -days 365 -out domain.crt

# Generate a Self-Signed Certificate from an existing private key
# openssl req -key domain.key -new -x509 -days 365 -out domain.crt

# Generate a Self-Signed Certificate from an existing Private Key and CSR
# openssl x509 -signkey domain.key -in domain.csr -req -days 365 -out domain.crt

# View CSR entries
# * You can verify a valid CSR with this command
# openssl req -text -noout -verify -in domain.csr

# View Certificate entries
# openssl x509 -text -noout -in domain.crt

# Verify a Certificate was signed by a Certificate from a
# Certificate Authority (CA)
# openssl verify -verbose -CAFile ca.crt domain.crt

# Create a private key
# openssl genrsa -des3 -out domain.key 2048

# Verify a private key
# openssl rsa -check -in domain.key

# Verify a Private Key matches a Certificate and CSR
# * If the output of these commands is identical or close
#   to identical, it is likely that they are related.
# openssl rsa -noout -modulus -in domain.key | openssl md5
# openssl x509 -noout -modulus -in domain.crt | openssl md5
# openssl req -noout -modulus -in domain.csr | openssl md5

# Encrypt and Unencrypted Private Key
# openssl rsa -des3 -in unencrypted.key -out encrypted.key

# Decrypt a Private Key
# openssl rsa -in encrypted.key -out decrypted.key

# Convert between PEM and DER formats
# openssl x509 -in domain.crt -outform der -out domain.der
# opnessl x509 -inform der -in domain.der -out domain.crt

# Get openssl version
# openssl version -a

# Generate Private Key and Certificate from sha256
# openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.crt
