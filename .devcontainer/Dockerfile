FROM node:22.11.0

RUN npm i npm@10.9.0 -g

ENV DEVCONTAINER=true

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

USER node
