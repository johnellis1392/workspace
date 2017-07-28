#!/usr/bin/env bash

# IMAGE_NAME=dns_app

# Build base app container
# docker build --rm ./app -f ./app/Dockerfile -t ${IMAGE_NAME}

# Bring up compose cluster
docker-compose up --build
