FROM node:alpine
ENV SRC_DIR /usr/src/app

RUN apt-get update && apt-get install -y \
    bind9 dnsutils bind9-doc curl iputils-ping npm \
    man vim less lshw nmap && \
    npm install -g npm n && n latest

COPY ./app ${SRC_DIR}
COPY ./ns1 /

WORKDIR ${SRC_DIR}
ENTRYPOINT [ "/startup.sh" ]
