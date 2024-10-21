FROM node:alpine3.18
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run test
RUN npm run build
WORKDIR /app/dist
EXPOSE 4000
CMD ["node", "index.js"]