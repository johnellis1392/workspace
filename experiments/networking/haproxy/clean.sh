#!/bin/bash

IMAGE_NAME=haproxy_base
docker rmi -f ${IMAGE_NAME} 2>/dev/null
docker rmi -f $(docker-compose images -q) 2>/dev/null
docker rmi -f $(docker images -q -f dangling=true) 2>/dev/null
docker rm $(docker ps -q -f status=exited) 2>/dev/null
