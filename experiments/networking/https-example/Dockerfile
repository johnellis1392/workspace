FROM node:latest

ENV TMP_FILE /tmp/app
ENV APP_DIR /usr/src/app

RUN mkdir -p ${TMP_FILE}
COPY ./package.json ${TMP_FILE}/package.json
RUN cd ${TMP_FILE} && npm install --loglevel silent

RUN mkdir -p ${APP_DIR}
RUN cp -a ${TMP_FILE}/node_modules ${TMP_FILE}/package.json ${APP_DIR}
COPY ./src ${APP_DIR}/src
COPY .babelrc ${APP_DIR}/.babelrc

WORKDIR ${APP_DIR}
ENTRYPOINT [ "npm", "start" ]
