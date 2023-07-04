FROM node:18

WORKDIR /usr/src/app/report_worker

COPY . .

RUN npm install && npm run build && rm -rf src

EXPOSE 3001

CMD [ "node", "./dist/main.js" ]
