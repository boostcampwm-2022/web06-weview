FROM node:16-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production --ignore-scripts
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
