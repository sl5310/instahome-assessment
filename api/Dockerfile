FROM node:13
RUN npm install --global pm2

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8000

CMD ["pm2-runtime", "start", "./dist/index.js"]