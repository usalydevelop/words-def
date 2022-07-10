FROM nginx:alpine
WORKDIR /usr/app/words-def
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "build"]
COPY ./dist /usr/share/nginx/html
EXPOSE 3280