FROM ubuntu:latest
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    bind9 bind9utils bind9-doc dnsutils curl iputils-ping npm \
    man vim less lshw nmap && \
    apt-get autoremove -y

RUN npm install -g npm n --loglevel silent && n latest

COPY ./package.json /usr/src/app/
RUN npm install --loglevel silent

COPY ./ /usr/src/app/
ENTRYPOINT [ "npm", "run", "start" ]
