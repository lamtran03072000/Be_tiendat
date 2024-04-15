FROM node

WORKDIR /usr/tiendat_be

COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

EXPOSE 8000

CMD ["yarn", "start"]


# docker build . -t img-tiendat-be

# docker run -d -p 8000:8000 --name cons-tiendat-be img-tiendat-be