FROM node:latest as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
EXPOSE 30081
CMD [ "npm", "start" ]