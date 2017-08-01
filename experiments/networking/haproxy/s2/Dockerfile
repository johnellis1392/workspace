FROM haproxy_base
WORKDIR /usr/src/app
COPY ./s2 /
COPY ./s2/startup.sh ./
ENTRYPOINT [ "./startup.sh" ]
