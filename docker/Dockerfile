FROM selenium/standalone-chrome:90.0
WORKDIR /app
RUN sudo apt-get update
RUN sudo apt-get --assume-yes install software-properties-common
RUN sudo apt-get --assume-yes install bash
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash 
RUN sudo apt-get --assume-yes install nodejs
COPY package*.json ./
RUN npm ci
CMD node ./src/index.js
