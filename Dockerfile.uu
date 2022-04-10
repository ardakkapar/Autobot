FROM node:17-alpine3.14 as builder
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
RUN npm run build 

FROM node:17-alpine3.14

WORKDIR /usr/app

RUN npm i -g serve 

COPY --from=builder /app/build /usr/app

EXPOSE 5000

CMD [ "serve", "-s" ]
