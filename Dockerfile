FROM node:20-alpine 

# WORKDIR /usr/src/app
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start-watch"]