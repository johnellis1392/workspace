FROM dns_base_image
WORKDIR /usr/src/app
COPY ./ns1 /
COPY ./ns1/startup.sh /usr/src/app/startup.sh
ENTRYPOINT [ "./startup.sh" ]
