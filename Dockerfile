FROM node:slim
MAINTAINER sunya

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies and build
COPY package.json /usr/src/app
RUN yarn

# Build
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]