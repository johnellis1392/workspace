FROM haproxy_base
WORKDIR /usr/src/app
COPY ./s1 /
COPY ./s1/startup.sh ./
ENTRYPOINT [ "./startup.sh" ]
