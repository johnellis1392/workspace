FROM dns_base_image
WORKDIR /usr/src/app
COPY ./ns2 /
COPY ./ns2/startup.sh /usr/src/app/startup.sh
ENTRYPOINT [ "./startup.sh" ]
