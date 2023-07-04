FROM node:18

WORKDIR /usr/src/app/api_sync

COPY . .

RUN npm install && npm run build && rm -rf src

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
