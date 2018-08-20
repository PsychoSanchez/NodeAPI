FROM node:10.5.0

LABEL maintainer="Aronov Aleks <psychosanchez@outlook.com>"

RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install --verbose
ENV NODE_PATH=/app/node_modules

COPY . /app/

CMD node /app/bin/www
