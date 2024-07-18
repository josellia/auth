FROM node:latest
WORKDIR /authentication
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD [ "npm",  "start" ]
EXPOSE 8080