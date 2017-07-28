FROM ubuntu:latest

ARG src_dir
ARG config_dir
WORKDIR ${src_dir}

RUN apt-get update && apt-get install -y \
    bind9 dnsutils bind9-doc curl iputils-ping npm \
    man vim less lshw nmap
RUN npm install -g npm n --loglevel silent && n latest

COPY ./app/package.json ${src_dir}/
RUN npm install --loglevel silent

COPY ./app ${src_dir}
RUN cp -a ${config_dir} /
