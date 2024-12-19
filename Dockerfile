FROM node:22.8.0-slim

RUN apt update && \
  apt install openssl procps -y && \
  npm install -g @nestjs/cli@10.4.8

USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "tail", "-f", "/dev/null" ]
