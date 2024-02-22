FROM node:17-alpine as builder
# set the working directory
WORKDIR /vqb
# install dependencies
COPY package.json .
RUN npm install

COPY . .