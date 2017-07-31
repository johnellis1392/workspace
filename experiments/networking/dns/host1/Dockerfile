FROM dns_base_image
WORKDIR /usr/src/app
COPY ./host1 /
COPY ./host1/startup.sh /usr/src/app/startup.sh
ENTRYPOINT [ "./startup.sh" ]
