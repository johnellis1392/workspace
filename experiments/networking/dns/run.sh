#!/usr/bin/env bash

# IMAGE_NAME=bind
# docker build --rm . -t ${IMAGE_NAME} && \
# docker run --rm --hostname "example.com" --cap-add=NET_ADMIN -p 3000:80 -it ${IMAGE_NAME}

docker-compose up --build
