FROM nginx:alpine as cbuild
RUN apk add --update nodejs npm
RUN apk add --update npm
WORKDIR /usr/apps/words-def
# COPY ./package.json ./apps/words-def/package.json
COPY . .
RUN npm install
RUN npm run build
# CMD ["npm", "run", "build"]
COPY ./dist /usr/share/nginx/html
EXPOSE 3280

FROM nginx:alpine
COPY --from=cbuild /usr/apps/words-def/dist /usr/share/nginx/html