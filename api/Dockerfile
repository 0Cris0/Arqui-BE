FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install pg --save
RUN npm i express

# Copio todo lo demás
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]