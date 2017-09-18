FROM python3:alpine
WORKDIR /usr/src/app

# Flask Port
EXPOSE 5000/tcp

# Zmq Sub Server
EXPOSE 4444/tcp

RUN pip install pyzmq Flask
COPY zmqserver.py zmqserver.py

CMD [ "python", "zmqserver.py" ]
