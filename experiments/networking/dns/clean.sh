#!/bin/bash

NETWORK_NAME=dns_dns_network
HOST1_IMAGE=dns_host1
NS1_IMAGE=dns_ns1
NS2_IMAGE=dns_ns2

docker-compose rm -f
docker rmi -f $(docker images -q -f dangling=true) 2>/dev/null
docker rm $(docker ps -q -f status=exited) 2>/dev/null
docker rmi -f ${HOST1_IMAGE} ${NS1_IMAGE} ${NS2_IMAGE} 2>/dev/null
docker network rm $(docker network ls -f name=${NETWORK_NAME}) 2>/dev/null
