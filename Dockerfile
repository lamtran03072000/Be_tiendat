FROM node:18.19.0-alpine

WORKDIR /usr/tiendat_be

COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

EXPOSE 8000

ENV DATABASE_URL="mysql://root:1901@61.14.233.55:3308/tiendat?schema=public"


CMD ["yarn", "start"]


# docker build . -t img-tiendat-be

#   cân nhắc (k lưu ảnh):  docker run -d -p 8000:8000 --name cons-tiendat-be img-tiendat-be 

# docker run -d -p 8000:8000 --name cons-tiendat-be -v img-tiendat-volume:/usr/tiendat_be/img-tiendat img-tiendat-be

