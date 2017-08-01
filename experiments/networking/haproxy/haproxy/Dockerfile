FROM haproxy_base
WORKDIR /usr/src/app
COPY ./haproxy /
COPY ./haproxy/startup.sh ./
ENTRYPOINT [ "./startup.sh" ]
