FROM node:12.14.0

WORKDIR /usr/src/Pomerelle-IMS
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000

CMD [ "node", "./bin/www" ]