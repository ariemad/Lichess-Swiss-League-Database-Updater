FROM node

WORKDIR /app
COPY . .
RUN npm i

CMD ["node", "app.js"]