FROM node:17-alpine3.14
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g ionic
RUN npm install
# add app
COPY . ./
# start app
CMD ["npm", "start"]