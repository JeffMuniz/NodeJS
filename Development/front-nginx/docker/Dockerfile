FROM bluecr.azurecr.io/blue/base-image-rh-front:1.2.1

WORKDIR /usr/src/build
COPY . /usr/src/build/
RUN yarn && \
    yarn run build:ENV

RUN mkdir -p /etc/ssl/certs/

COPY ./docker/ca.crt /etc/ssl/certs/

COPY ./docker/ca.key /etc/ssl/certs/

RUN chmod a+w /etc/ssl/certs/ca.crt && chmod a+w /etc/ssl/certs/ca.key \
      && chmod -R 750 /etc/ssl/certs/ca.crt && chmod -R 750 /etc/ssl/certs/ca.key \
      && chmod 710 /etc/ssl/certs/ca.crt && chmod 710 /etc/ssl/certs/ca.key

RUN mkdir -p /run/nginx

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
