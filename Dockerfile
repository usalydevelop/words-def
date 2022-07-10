FROM nginx:alpine
RUN apk update
RUN apk add git

RUN apk update && \
    apk add git && \
    apk add openssh-server

ARG ssh_prv_key
ARG ssh_pub_key

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh

# Add the keys and set permissions
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub

RUN git clone git@github.com:usalydevelop/words-def.git

RUN npm install
RUN npm run build
COPY ./dist /usr/share/nginx/html
EXPOSE 3280

# Remove SSH keys
RUN rm -rf /root/.ssh/