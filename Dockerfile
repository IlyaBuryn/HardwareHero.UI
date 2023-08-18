FROM node:20-slim

# WORKDIR /usr/src/app
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev-exposed"]