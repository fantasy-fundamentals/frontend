#Dockerifle
FROM node:16.20
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN yarn
COPY . ./
EXPOSE 3000
CMD ["yarn","start"]
