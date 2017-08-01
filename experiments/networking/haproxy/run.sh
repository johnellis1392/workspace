#!/bin/bash

IMAGE_NAME=haproxy_base
docker build --rm ./app -f ./app/Dockerfile -t ${IMAGE_NAME}

docker-compose up --build
