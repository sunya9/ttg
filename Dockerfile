FROM node:slim

# Create app directory
RUN mkdir -p /var/opt/ttg
WORKDIR /var/opt/ttg

# get source
RUN curl -SL https://github.com/sunya9/ttg/archive/master.tar.gz | tar -xz -C /var/opt/ttg --strip-components 1

# Install app dependencies and build
RUN npm install && npm run build
    
EXPOSE 3000
VOLUME /var/opt/ttg

CMD ["npm", "start"]