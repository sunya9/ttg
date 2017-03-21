FROM node:slim

# Create app directory
RUN mkdir -p /var/opt/ttg
WORKDIR /var/opt/ttg

# Install app dependencies and build
COPY package.json /var/opt/ttg
RUN npm set progress false \
    && npm install \
    && head -c1M /dev/urandom | sha1sum | awk '{print "[\""$1"\"]"}' > config/keys.json


# Build
COPY . /var/opt/ttg
RUN npm run build
    
EXPOSE 3000
VOLUME /var/opt/ttg

CMD ["npm", "start"]