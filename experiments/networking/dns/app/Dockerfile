FROM ubuntu:latest
WORKDIR /usr/src/app
VOLUME /usr/src/config

RUN apt-get update && apt-get install -y \
    bind9 dnsutils bind9-doc curl iputils-ping npm \
    man vim less lshw nmap && \
    apt-get autoremove -y
RUN npm install -g npm n --loglevel silent && n latest

COPY ./package.json /usr/src/app/
RUN npm install --loglevel silent

COPY ./ /usr/src/app/
RUN cp -a /usr/src/config /

ENTRYPOINT [ "./startup.sh" ]
