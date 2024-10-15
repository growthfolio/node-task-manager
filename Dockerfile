FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

# if NODE_ENV is "development", use nodemon; otherwise, use node
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm install && nodemon /app/src/server.js; else node /app/src/server.js; fi" ]
